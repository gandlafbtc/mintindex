import type { PageServerLoad } from '../../$types';

export const load: PageServerLoad = async ({params}) => {
    const id: number = +params.slug
    const mint = await prisma.mint.findUnique({where: {id}})
    let info  = {}
    try {
        const response = await fetch(mint?.url+'/info')
        info = await response.json()
    } catch (error) {
        console.log(error)
    }
    return {mint, info}
};