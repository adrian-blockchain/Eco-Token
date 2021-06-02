import React, {ReactNode, SFC, useState} from "react";
import EXIF from 'exif-js'
import ipfs from "../ipfs";
import NFTExport from "./NFTExport";
import {Simulate} from "react-dom/test-utils";
import './GetImage.css'
import GetDataForVerif from "./GetDataForVerification";


export const GetImage = ()=>{
    const [i, setI] = useState<number>(0)
    const [arrayNumber, setArrayNumber] = useState<number[]>()
    const [arrayString, setArrayString] = useState<string[]>()
    const [buffer, setBuffer] = useState<any>('')
    const [ipfsHash, setIpfsHash] = useState<any>('')

    const captureFile = (event:any) =>{
        console.log('image mise')
        event.preventDefault()
        const file = event.target.files[0]
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = () =>{
            // @ts-ignore
            if (typeof reader.result !== 'null'){
                // @ts-ignore
                const buffer = Buffer.from(reader.result)
                setBuffer(buffer);
                console.log(typeof buffer)
                console.log(buffer)
            }

        }
        ipfs.files.add(buffer, (error:any, result:any)=>{
            if (error){
                console.log(error)
                return
            }
            setIpfsHash(result[0].hash)
            console.log(ipfsHash)
        })



        console.log(file)
        if (file && file.name){
            EXIF.getData(file, function (){
                let exifData = EXIF.pretty(file)

                if (exifData){
                    try {

                        const allMetaData = EXIF.getAllTags(file);
                        const LongitudeDegreesData:number = allMetaData.GPSLongitude[0].numerator/allMetaData.GPSLongitude[0].denominator;
                        const LongitudeMinutesData:number = allMetaData.GPSLongitude[1].numerator/allMetaData.GPSLongitude[1].denominator;
                        const LongitudeSecondsData:number = allMetaData.GPSLongitude[2].numerator/allMetaData.GPSLongitude[2].denominator;
                        const LongitudeRefData: string = allMetaData.GPSLongitudeRef;

                        const LatitudeDegreesData:number = allMetaData.GPSLatitude[0].numerator/allMetaData.GPSLatitude[0].denominator;
                        const LatitudeMinutesData:number = allMetaData.GPSLatitude[1].numerator/allMetaData.GPSLatitude[1].denominator;
                        const LatitudeSecondsData:number = allMetaData.GPSLatitude[2].numerator/allMetaData.GPSLatitude[2].denominator;
                        const LatitudeRefData:string = allMetaData.GPSLatitudeRef;
                        const timeData:string = allMetaData.DateTime;
                        const directionData:number = allMetaData.GPSImgDirection.numerator/allMetaData.GPSImgDirection.denominator;

                        console.log("Latitude degrees: ",LatitudeDegreesData)

                        let arrayCoordNumber: number[] = [LongitudeDegreesData,LongitudeMinutesData, LongitudeSecondsData,
                            LatitudeDegreesData, LatitudeMinutesData, LatitudeSecondsData, directionData ];
                        setArrayNumber(arrayCoordNumber)
                        let arrayCoordString: string[] = [LongitudeRefData, LatitudeRefData, timeData, ipfsHash]

                        setArrayString(arrayCoordString);

                    }catch (error){
                        return <div><h2>No GPS data found on your pitcures
                            , please check your cameras settings</h2></div>
                    }



                }

            })
        }
    }
    const onSubmit=(event:any)=>{
        event.preventDefault()
        console.log("On submit")



    }



    return <div>
        <h3>Upload your <strong>first</strong>picture</h3>
        <form onSubmit={onSubmit}>
            <input type='file' onChange={captureFile}/>
            <input type='submit' value="Validate"/>
        </form>
        <img src={`https://ipfs.io/ipfs/${ipfsHash}`} alt="" />
        <GetDataForVerif numberArray={arrayNumber} stringArray={arrayString} ident={i} />

    </div>
}

export default GetImage;




