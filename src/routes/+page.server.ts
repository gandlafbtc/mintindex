import { fail, type Actions } from "@sveltejs/kit";

import { prisma } from "../lib/server/prisma";
import type { PageServerLoad } from "./$types";
import { mintExists, validateMintUrl } from "../util/util";

export const load: PageServerLoad = async () => {
    return {mints: await prisma.mint.findMany()}
};



export const actions: Actions = {
    createMint: async ({ request }) => {
        const { url } = Object.fromEntries(await request.formData()) as { url: string }

        if(!validateMintUrl(url)){
            return fail(400, { message: 'Mint url not valid' })
        }

        if(await mintExists(url)){
            return fail(400, { message: 'Mint already' })
        }

        try {
            await prisma.mint.create({ data: { url } })
        }
        catch (err) {
            console.error(err)
            return fail(500, { message: 'could not create mint item' })
        }

        return {
            status: 201
        }
    },
    deleteMint:async ({url}) => {
        const id  = url.searchParams.get('id')
        if (!id) {
            return fail(400, { message: 'no mint id specified' })
        }

        try {
            await prisma.mint.delete({where: {id: Number(id)}})
        } catch (err) {
            console.error(err)
            return fail(500, { message: 'could not delete mint item' })
        }
    }
};