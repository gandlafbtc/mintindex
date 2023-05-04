import { json } from "@sveltejs/kit";

export async function GET() {
    const mints = await prisma.mint.findMany({select: {url: true}})
    const mintUrls = mints.map((m)=> m.url)
    return json(mintUrls)
    };
