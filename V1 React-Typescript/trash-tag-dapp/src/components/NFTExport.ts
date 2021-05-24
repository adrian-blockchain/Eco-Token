import {NFTStorage, Blob} from 'nft.storage'

const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGVkZjg5YTk0RTIzOUZlNTIxRTM0NGZDMTM1NmExNTliNjZDNTU0YTciLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYyMTY5NzU1NTAwNCwibmFtZSI6IlRlc3QifQ.e-8LY-nAjOyElrYThLB319VG74HCoKm3d25-vBcb1no'
const client = new NFTStorage({token: apiKey})




export const NFTExport =async (props: any) => {


    const content = new Blob([props])

    const cid = await client.storeBlob(content)

    console.log(cid)


}
export default NFTExport;