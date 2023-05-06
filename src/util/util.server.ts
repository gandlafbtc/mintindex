import { CashuMint, CashuWallet, getEncodedToken, type Proof } from "@cashu/cashu-ts"
import { prisma } from "../lib/server/prisma";
import { getAmountForTokenSet } from "./util";

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
