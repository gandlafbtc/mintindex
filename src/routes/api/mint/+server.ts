import { json } from "@sveltejs/kit";
import { prisma } from "../../../lib/server/prisma";

export async function GET() {
    const mints = await prisma.mint.findMany({select: {url: true}})
    const mintUrls = mints.map((m)=> m.url)
    return json(mintUrls)
    };
