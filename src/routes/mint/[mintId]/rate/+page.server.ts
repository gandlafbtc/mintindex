import { fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from '../../../$types';
import { prisma } from "../../../../lib/server/prisma";
import { claimToken } from '../../../../util/util';


export const load: PageServerLoad = async ({params}) => {
    const id: number = +params.mintId
    const mint = await prisma.mint.findUnique({where: {id},include: {uptime: true}})
    return {mint}
};

export const actions: Actions = {
    createRating: async ({ request, params }) => {
        const mintId: number = +params.mintId

        const data = await request.json()
        if (!(await claimToken(data.nut, 4))) {
             return fail(400, { message: 'provided invalid or not enough ecash' })
        }
        
        const weight = 1

        let id
        try {
            const rating = await prisma.rating.create({ data: { date: new Date(), mintId:mintId, details: data.details, points: data.points, author: data.author, weight } })
            id = rating.id
        }
        catch (err) {
            console.error(err)
            return fail(500, { message: 'could not create review item' })
        }
        return {
            status: 201,
            id
        }
    },
}