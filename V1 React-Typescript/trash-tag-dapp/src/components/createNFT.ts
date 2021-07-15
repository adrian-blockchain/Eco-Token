


export const createNFT =async (account:string, contract:any, uri:any) =>{

    await contract.methods.MintForTest(uri, account).send(
        {from: account}
    )
}

export default createNFT;