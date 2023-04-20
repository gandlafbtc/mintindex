
export const validateMintUrl =(url: string): boolean=> {
    if (!url.startsWith("https://")) {
        return false
    }
    
    return true
}

export const mintExists = async (url: string): Promise<boolean>=> {
    if(await prisma.mint.findFirst({where:{url: String(url)}})){
        return true

    }
    return false
}