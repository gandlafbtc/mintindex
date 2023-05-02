import { CashuMint, CashuWallet, getEncodedToken, type Proof } from "@cashu/cashu-ts"

export const validateMintUrl =(url: string): boolean=> {
    return url.startsWith("https://")
}

export const mintExists = async (url: string): Promise<boolean>=> {
    if(await prisma.mint.findFirst({where:{url: String(url)}})){
        return true

    }
    return false
}

export const claimToken = async (token: string, minAmount: number): Promise<boolean> => {
    const mintUrl = "https://legend.lnbits.com/cashu/api/v1/4gr9Xcmz3XEkUNwiBiQGoC"
    try {
        if (!token.startsWith('cashu')) {
            return false
        }
        const cashuMint = new CashuMint(mintUrl)
        const keys = await cashuMint.getKeys()
        const cashWallet = new CashuWallet(keys, cashuMint)
        const { proofs, tokensWithErrors } = await cashWallet.receive(token)
        const amountReceived = getAmountForTokenSet(proofs)
        if (amountReceived > 0) {
            await prisma.cashuToken.create({ data: { token: getEncodedToken({ token: [{ proofs, mint: mintUrl }] }) } })
        }
        if (amountReceived < minAmount) {
            return false
        }
        return true
    } catch (error) {
        console.error(error, 'could not claim tokens keys from mint host: ' + token)
        return false
    }
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
export  const getAmountForTokenSet = (tokens: Array<Proof>): number => {
	return tokens.reduce((acc, t) => {
		return acc + t.amount;
	}, 0);
};
