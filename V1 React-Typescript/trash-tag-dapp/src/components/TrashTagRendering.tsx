import React, {useEffect, useState} from "react";
import {json, string} from "hardhat/internal/core/params/argumentTypes";
import * as url from "url";
import axios from 'axios'






export const TrashTagRendering =() => {
    //let uri= `https://ipfs.io/ipfs/${cid}`
    let uri = 'https://ipfs.io/ipfs/bafkreielecvyrjhoxhd2bnwahsnwph3bxcdb5s2lcmcdwg7xdyi4i3qvum'
    const [tokenInfo, setTokenInfo] = useState<any>()

    useEffect(()=>{
        const init= async ()=>{
            console.log('In useeffect')

                axios.interceptors.request.use(require=>{
                    require.headers.authorization = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
                    return require
                })

                const {data} = await axios.get(uri)
                console.log(data)
                setTokenInfo(data.result)




        };
        init()
    }, []);

    if (tokenInfo !== undefined){

        return (<div>
            <h3 className='text-center'>{tokenInfo[0].DateTime}</h3>
            <img src={tokenInfo[0].ImgHash} alt="" className="trashimg" />
            <img src={tokenInfo[1].ImgHash} alt="" className="trashimg" />
            <h3> Localisation:</h3>
            <h4>Longitude: {tokenInfo[0].GPSLongitudeDegrees} </h4>
            <h4>Longitude: {tokenInfo[0].GPSLatitudeDegrees} </h4>



        </div>)

    }else {
        return (<div><p>Loading...</p></div>)
    }


}
export default TrashTagRendering