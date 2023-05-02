import type { PageServerLoad } from '../../$types';

export const load: PageServerLoad = async ({params}) => {
    const id: number = +params.slug
    const mint = await prisma.mint.findUnique({where: {id},include: {uptime: true}})
    let info  = {}
    try {
        const response = await fetch(mint?.url+'/info')
        await prisma.uptime.create({ data: { date: new Date(), mintId: id, isUp: true } })
        info = await response.json()
    } catch (error) {
        console.log(error)
        await prisma.uptime.create({ data: { date: new Date(), mintId: id, isUp: false } })
    }
    return {mint, info}
};