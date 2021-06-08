import React, {ReactNode, SFC, useState} from "react";
import EXIF from 'exif-js'
import ipfs from "../ipfs";
import MetadataExport from "./metadataExport";
import {Simulate} from "react-dom/test-utils";
import './GetImage.css'
import verification from "./verification";
import GetDataForVerif from "./GetDataForVerification";
import createNFT from "./createNFT";


export const GetImage = ({account, contract}:{account:string, contract:any})=>{
    const [img1, setImg1] =useState<any>();
    const [img2, setImg2] = useState<any>();
    let [imgHash, setImgHash] = useState<string[]>([])
    let [loading, setLoading] = useState<number>(0)


    let [MetaDataImg1, setMetaDataImg1] = useState<any>()
    let [MetaDataImg2, setMetaDataImg2] = useState<any>()


    let verif:boolean = false;

    const captureImg1 = (event:any) =>{
        console.log('image 1 deposed')
        event.preventDefault()
        const file1 = event.target.files[0]
        setImg1(file1);


        if (file1 && file1.name){
            EXIF.getData(file1, function (){
                let exifDataImg1 = EXIF.pretty(file1)
                if (exifDataImg1){
                    try {
                        const allMetaDataImg1 = EXIF.getAllTags(file1)
                        setMetaDataImg1(allMetaDataImg1)
                        console.log(allMetaDataImg1)
                        if (allMetaDataImg1.DateTime !== undefined){
                            return (<div>
                                <h3>Time : {allMetaDataImg1.DateTime}</h3>
                            </div>)
                        }else {
                            return <div><h3>Your pictures do not includes gps metadatas </h3></div>
                        }

                    } catch (e) {
                        console.log(e)

                    }
                }
            })
        }


    }
    const captureImg2 = (event:any) =>{
        console.log('image 2 deposed')
        event.preventDefault()
        const file2 = event.target.files[0]
        setImg2(file2);


        if (file2 && file2.name){
            EXIF.getData(file2, function (){
                let exifDataImg2 = EXIF.pretty(file2)
                if (exifDataImg2){
                    try {
                        const allMetaDataImg2 = EXIF.getAllTags(file2)
                        setMetaDataImg2(allMetaDataImg2)
                        console.log(allMetaDataImg2)
                        if (allMetaDataImg2.DateTime !== undefined){
                            return (<div>
                                <h3>Time : {allMetaDataImg2.DateTime}</h3>
                            </div>)
                        }else {
                            return <div><h3>Your pictures do not includes gps metadatas </h3></div>
                        }


                    } catch (e) {
                        console.log(e)

                    }
                }
            })
        }

    }

    const ImgOnIpfs = async (img:any) => {


        const reader = new window.FileReader()
        reader.readAsArrayBuffer(img)
        reader.onloadend = () =>{
            // @ts-ignore
            if (typeof reader.result !== 'null'){
                // @ts-ignore
                const buffer = new Buffer(reader.result)

                ipfs.files.add(buffer, async (error:any, result:any)=> {
                    await result
                    setLoading(+1)
                    console.log(result)
                    console.log(loading)

                    await setImgHash(prevState => [...prevState, result[0].hash])

                    if (error) {
                        console.log(error)
                        return
                    }
            return result
                })
            }
        }

    }

    function wait(ms:number){
        var d:any = new Date();
        var d2:any = null;
        do {
            d2= new Date();}
        while (d2-d< ms)

    }

    const validateNFT=async ()=>{
        const uri:string = await MetadataExport(MetaDataImg1, MetaDataImg2, imgHash[0], imgHash[1] )
        await createNFT(account, contract, uri)
        console.log(`https://ipfs.io/ipfs/${uri}`)
    }




    const onSubmit= async (event:any)=>{
        event.preventDefault()
        console.log("On submit")


        verif = verification(MetaDataImg1,MetaDataImg2)
        console.log(verif)
        if (verif === true) {
            console.log("Img 1")

            const img1Hash = await ImgOnIpfs(img1);


            console.log("Img2")
            await ImgOnIpfs(img2);
            console.log(loading)




            console.log("après if")
        }
        else {
            return(
                <div>
                    <h3> Your trashtag is not valid</h3>
                </div>
            )
        }

    }



    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    return <div>
        <h3>Upload your <strong>first</strong>picture</h3>
        <form onSubmit={onSubmit}>
            <input type='file' onChange={captureImg1} className="inputImg"/>
            <input type='file' onChange={captureImg2} className="inputImg"/>
            <input type='submit' value="Validate"/>
        </form>
        {imgHash[1]==undefined ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
        :
            <div>
                <img src={`https://ipfs.io/ipfs/${imgHash[0]}`} alt="" className="trashimg" />
                <img src={`https://ipfs.io/ipfs/${imgHash[1]}`} alt="" className="trashimg"/>
                <button onClick={validateNFT}>Validate your nft</button>
            </div>
        }





    </div>
}

export default GetImage;




