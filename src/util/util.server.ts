import { CashuMint, CashuWallet, getDecodedToken, getEncodedToken, type Proof } from "@cashu/cashu-ts"
import { prisma } from "../lib/server/prisma";
import { getAmountForTokenSet } from "./util";

export const mintExists = async (url: string): Promise<boolean>=> {
    if(await prisma.mint.findFirst({where:{url: String(url)}})){
        return true

    }
    return false
}

export const claimToken = async (tokenString: string, minAmount: number): Promise<boolean> => {
    const mintUrl = "https://legend.lnbits.com/cashu/api/v1/4gr9Xcmz3XEkUNwiBiQGoC"
    try {
        if (!tokenString.startsWith('cashu')) {
            return false
        }
        const cashWallet = new CashuWallet(new CashuMint(mintUrl))
        const { token, tokensWithErrors } = await cashWallet.receive(tokenString)
        const tokenFromMint = token.token.find(t=>t.mint===mintUrl)
        const amountReceived = getAmountForTokenSet(tokenFromMint?.proofs??[])
        if (amountReceived > 0 && tokenFromMint) {
            await prisma.cashuToken.create({ data: { token: getEncodedToken({ token: [tokenFromMint] }) } })
        }
        if (amountReceived < minAmount) {
            return false
        }
        return true
    } catch (error) {
        console.error(error, 'could not claim tokens keys from mint host: ' + tokenString)
        return false
    }
}
