
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

export async function sha256(message:string) {
    // encode as UTF-8
    const msgBuffer = new TextEncoder().encode(message);
  
    // hash the message
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  
    // convert ArrayBuffer to Array
    const hashArray = Array.from(new Uint8Array(hashBuffer));
  
    // convert bytes to hex string
    const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
    return hashHex;
  }