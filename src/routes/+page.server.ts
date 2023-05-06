import { fail, type Actions } from "@sveltejs/kit";

import { prisma } from "../lib/server/prisma";
import type { PageServerLoad } from "./$types";
import { validateMintUrl } from "../util/util";
import { claimToken, mintExists } from "../util/util.server";

export const load: PageServerLoad = async ({ url }) => {
    const cursorParam = url.searchParams.get("cursor")
    const filter = url.searchParams.get("filter")

    await prisma.mint.findMany({ take: 10, orderBy: { id: 'asc' }, include: { uptime: true, rating: {select: {weight: true, points: true}} } })
    const query: any ={ take: 10, orderBy: { id: 'asc' }, include: { uptime: true, rating: {select: {weight: true, points: true}} } }

    const cursor = cursorParam ? +cursorParam : undefined
    if (cursor) {
        query.skip = 1
        query.cursor = { id: cursor }
    }
    if (filter) {
        query.where = { url: { contains: filter } }
    }

    const mints = await prisma.mint.findMany(query)
    return { mints }

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

        if (!(await claimToken(token, 16))) {
            return fail(400, { message: 'provided invalid or not enough ecash' })
        }
        let id
        try {
            const mint = await prisma.mint.create({ data: { url, rank: 1, date: new Date() } })
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
        if (!(await claimToken(token, 65536))) {
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

