import React,{useState} from "react";
// @ts-ignore
import axios from "axios";
import {Card} from "./Card";

const TrashTagRendering = (contract:any, account:any) =>{
    /*
    let res: any = await axios.get(`https://ipfs.io/ipfs/${cid}`)

    const updateArr =  {
        id: i,
        img1: res.data[0].ImgHash,
        img2: res.data[1].ImgHash,
        GPSLatitude: res.data[0].GPSLatitudeDegrees,
        GPSLongitude: res.data[0].GPSLongitudeDegrees,
        Date: res.data[0].DateTime
    };

     */

    const [amountNFT, setAmountNFT] = useState<number>(0)
    const [objs, setObjs] = useState<any>()

    const ViewNFT=async ()=>{

                const AmountNFT: number = await contract.methods.getAmountNFT(account).call({from: account})
                setAmountNFT(AmountNFT)
                console.log(AmountNFT)

                let i: number;

                console.log("Avant boucle")



                for (i = 1; i <= AmountNFT; i++) {
                    //Localisation of the metadatas stored in the NFT
                    let cid =await contract.methods.getURItest(i).call({from: account})

                    console.log(cid)
                    //Extract metadatas from IPFS
                    let res: any =await axios.get(`https://ipfs.io/ipfs/${cid}`)

                    const updateArr = [
                        ...objs,
                        {
                            id: i,
                            img1: res.data[0].ImgHash,
                            img2: res.data[1].ImgHash,
                            GPSLatitude: res.data[0].GPSLatitudeDegrees,
                            GPSLongitude: res.data[0].GPSLongitudeDegrees,
                            Date: res.data[0].DateTime
                        }
                    ];

                    setObjs(updateArr)
                }
    }
    ViewNFT()


    return (<div>
        <h2>datas</h2>
        {amountNFT == 0 ? <div><h2>You did not participate to a trashtag Challenge yet</h2></div>
            :
            <div>
                <h2>Amount of trashtag NFT:{amountNFT}</h2>

                {
                    objs.map((obj: any) => (
                        <div key={obj.id}>
                            <p>{obj.GPSLatitude}</p>
                            <p>{obj.GPSLongitude}</p>
                            <p>{obj.Date}</p>
                            <p>{obj.img2}</p>
                            <p>{obj.img1}</p>
                        </div>
                    ))}
            </div>
        }
        </div>

            )
}

export default TrashTagRendering;