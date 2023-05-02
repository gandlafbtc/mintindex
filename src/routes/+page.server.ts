import { fail, type Actions } from "@sveltejs/kit";

import { prisma } from "../lib/server/prisma";
import type { PageServerLoad } from "./$types";
import { claimToken, mintExists, validateMintUrl } from "../util/util";

export const load: PageServerLoad = async () => {
    return { mints: await prisma.mint.findMany({ include: { uptime: true } }) }
};

export const actions: Actions = {
    createMint: async ({ request }) => {
        const { url, token } = await request.json()

        if (!validateMintUrl(url)) {
            return fail(400, { message: 'Mint url not valid' })
        }

        if (!(await canLoadKeys(url))) {
            return fail(400, { message: 'Mint url not valid. could not load keys' })
        }

        if (await mintExists(url)) {
            return fail(400, { message: 'Mint already exists' })
        }

        if (!(await claimToken(token, 21))) {
            return fail(400, { message: 'provided invalid or not enough ecash' })
        }
        let id
        try {
            const mint = await prisma.mint.create({ data: { url } })
            console.log(mint)
            id = mint.id
        }
        catch (err) {
            console.error(err)
            return fail(500, { message: 'could not create mint item' })
        }

        return {
            status: 201,
            id
        }
    },

    deleteMint: async ({ request }) => {
        const { id, token } = await request.json()

        if (!id) {
            return fail(400, { message: 'no mint id specified' })
        }
        if (!(await claimToken(token, 210))) {
            return fail(400, { message: 'provided invalid or not enough ecash' })
        }
        try {
            await prisma.mint.delete({ where: { id: Number(id) } })
        } catch (err) {
            console.error(err)
            return fail(500, { message: 'could not delete mint item' })
        }
        return {
            status: 200,
        }
    }
};

const canLoadKeys = async (url: string): Promise<boolean> => {
    try {
        const response = await fetch(url + "/keys")
        const keys = await response.json()
        if (!keys) {
            return false
        }
        return true
    } catch (error) {
        console.error(error, 'could not fetch keys from mint host: ' + url)
        return false
    }
}

