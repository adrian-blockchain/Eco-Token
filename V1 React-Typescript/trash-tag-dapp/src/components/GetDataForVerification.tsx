import React, {useState} from "react";
import EXIF from "exif-js";
import NFTExport from "./NFTExport";
import ipfs from "../ipfs";

interface CoordinatedNumber  {
    LongitudeDegrees: number,
    LongitudeMinutes: number,
    LongitudeSeconds: number,
    LatitudeDegrees: number,
    LatitudeMinutes: number,
    LatitudeSeconds: number,
    direction: number
}

interface CoordinatedString {
    LongitudeRef: string,
    LatitudeRef: string,
    time: string,
}


interface  PropsData {
    numberArray?: number[],
    stringArray?: string[],
    ident?: number,
}


export const GetDataForVerif:React.FC<PropsData> =(props)=>{
    const [img2, setImg2] = useState<string>('')
    const [buff2, setBuff2] = useState<any>('')
    console.log(props)
    if (typeof props.numberArray !== 'undefined' && typeof props.stringArray !== 'undefined'){
        console.log(props.numberArray[2])
        const numberArray:number[] = props.numberArray;
        const stringArray:string[] = props.stringArray;

        const verify =(event:any) => {
            event.preventDefault()
            const file2 = event.target.files[0]
            const reader = new window.FileReader();
            reader.readAsArrayBuffer(file2);
            reader.onloadend = () =>{
                // @ts-ignore
                if (typeof reader.result !== 'null'){
                    // @ts-ignore
                    const buffer = Buffer.from(reader.result)
                    setBuff2(buffer);
                    console.log(typeof buffer)
                    console.log(buffer)
                }

            }
            ipfs.files.add(buff2, (error:any, result:any)=>{
                if (error){
                    console.log(error)
                    return
                }
                setImg2(result[0].hash)
                console.log(img2)
            })

            if (file2 && file2.name) {
                EXIF.getData(file2, function () {
                    let exifData2 = EXIF.pretty(file2)

                    if (exifData2) {

                        try {
                            const allMetaData = EXIF.getAllTags(file2);
                            if (allMetaData.GPSLongitude[0].numerator / allMetaData.GPSLongitude[0].denominator === numberArray[0]
                                && allMetaData.GPSLongitude[1].numerator / allMetaData.GPSLongitude[1].denominator === numberArray[1]
                                && allMetaData.GPSLongitude[2].numerator / allMetaData.GPSLongitude[2].denominator === numberArray[2] //add a tolerance
                                && allMetaData.GPSLongitudeRef === stringArray[0]
                                && allMetaData.GPSLatitude[0].numerator / allMetaData.GPSLatitude[0].denominator === numberArray[3]
                                && allMetaData.GPSLatitude[1].numerator / allMetaData.GPSLatitude[1].denominator === numberArray[4]
                                && allMetaData.GPSLatitude[2].numerator / allMetaData.GPSLatitude[2].denominator == numberArray[5] //Add a tolerance
                                && allMetaData.GPSLatitudeRef === stringArray[1]
                                && allMetaData.GPSImgDirection.numerator / allMetaData.GPSImgDirection.denominator === numberArray[6]) {
                                console.log("C'est les memes BG")

                                var fs = require('fs')
                                var data = {
                                    img1:{
                                        ImgHash: stringArray[3],
                                        GPSLongitudeDegrees: numberArray[0],
                                        GPSLongitudeMinutes: numberArray[1],
                                        GPSLongitudeSeconds: numberArray[2],
                                        GPSLongitudeRef: stringArray[0],
                                        GPSLatitudeDegrees: numberArray[3],
                                        GPSLatitudeMinutes: numberArray[4],
                                        GPSLatitudeSeconds: numberArray[5],
                                        GPSLatitudeRef: stringArray[1],
                                        GPSImgDirection: numberArray[6],
                                        DateTime: stringArray[2]
                                    },
                                    img2:{
                                        ImgHash: img2,
                                        GPSLongitudeDegrees: allMetaData.GPSLongitude[0].numerator / allMetaData.GPSLongitude[0].denominator,
                                        GPSLongitudeMinutes: allMetaData.GPSLongitude[1].numerator / allMetaData.GPSLongitude[1].denominator,
                                        GPSLongitudeSeconds: allMetaData.GPSLongitude[2].numerator / allMetaData.GPSLongitude[2].denominator,
                                        GPSLongitudeRef: allMetaData.GPSLongitudeRef,
                                        GPSLatitudeDegrees: allMetaData.GPSLatitude[0].numerator / allMetaData.GPSLatitude[0].denominator,
                                        GPSLatitudeMinutes: allMetaData.GPSLatitude[1].numerator / allMetaData.GPSLatitude[1].denominator,
                                        GPSLatitudeSeconds: allMetaData.GPSLatitude[2].numerator / allMetaData.GPSLatitude[2].denominator,
                                        GPSLatitudeRef: allMetaData.GPSLatitudeRef,
                                        GPSImgDirection: allMetaData.GPSImgDirection.numerator / allMetaData.GPSImgDirection.denominator,
                                        DateTime: allMetaData.DateTime

                                    }
                                }
                                console.log('object created')
                                console.log(data)

                                NFTExport(data)


                            }


                        } catch (error) {
                            console.log(error)
                        }


                    }


                })
            }

        }
        return (<div>
                <h4>Upload your <strong>Second</strong>image</h4>
                <input type="file" onChange={verify}/>
                <img src={`https://ipfs.io/ipfs/${img2}`} alt=""/>
            </div>
        )
    }
    else {

        return( <div><h4>Put your first image</h4></div>)
    }
    return null;

}

export default GetDataForVerif;
