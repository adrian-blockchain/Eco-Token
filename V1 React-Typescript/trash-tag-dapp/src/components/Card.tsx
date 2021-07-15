import * as React from "react";
import "./card.css";
// @ts-ignore
import axios from "axios";
import {useState} from "react";

interface Props{
    cid:string
}

export const Card:({cid}: { cid: string}) => (JSX.Element|null) =({cid})=>{

    const [res, setRes] = useState()
    const [loading, setLoading] = useState(true)

    const load =async ()=> {
        const ans: any = await axios.get(`https://ipfs.io/ipfs/${cid}`)

        setRes(ans)

        console.log(ans)
        console.log(typeof res)

    }

    const chargeComponent=async ()=>{
        if (loading){
            await load()
            setLoading(false)
        }
    }

    chargeComponent()



    const view=(res:any)=> {


            return (

            <div className="card-container">
                <div className="image-container">
                    <img src={res.data[0].ImgHash}/>
                    <img src={res.data[1].ImgHash}/>
                </div>

                <div className="card-content">
                    <div className="card-title">
                        <h3>TrashTag {res.data[0].DateTime}</h3>
                    </div>

                    <div className="card-body">
                        <p>GPS Latitude: {res.data[0].GPSLatitudeDegrees}</p>
                        <p>GPS Longitude: {res.data[0].GPSLongitudeDegrees}</p>
                    </div>

                </div>

            </div>
            )
        }




    return <div>{typeof res == "undefined" ?<div><p>It's loading</p></div>
    :
        view(res)
    }</div>








}
export default Card;