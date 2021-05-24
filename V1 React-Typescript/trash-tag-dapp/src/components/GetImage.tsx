import React, {Component, ReactNode, SFC, useState} from "react";
import EXIF from 'exif-js'
import ipfs from "../ipfs";
import NFTExport from "./NFTExport";

import {type} from "os";
import * as buffer from "buffer";


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






const GetDataForVerif:React.FC<PropsData> =(props)=>{

    console.log(props)
    if (typeof props.numberArray !== 'undefined' && typeof props.stringArray !== 'undefined'){
        console.log(props.numberArray[2])
        const numberArray:number[] = props.numberArray;
        const stringArray:string[] = props.stringArray;

        const verify =(event:any) => {
            event.preventDefault()
            const file2 = event.target.files[0]

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
            </div>
        )
    }
    else {

        return( <div><h4>Put your first image</h4></div>)
    }
    return null;

}



export const GetImage = ()=>{
    const [i, setI] = useState<number>(0)
    const [arrayNumber, setArrayNumber] = useState<number[]>()
    const [arrayString, setArrayString] = useState<string[]>()

    const onSubmit = (event:any)=>{
        console.log("On submit")


    }

    const captureFile = (event:any) =>{
        console.log('image mise')
        event.preventDefault()
        const file = event.target.files[0]
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
                        let arrayCoordString: string[] = [LongitudeRefData, LatitudeRefData, timeData]

                        setArrayString(arrayCoordString);

                    }catch (error){
                        return <div><h2>No GPS data found on your pitcures
                            , please check your cameras settings</h2></div>
                    }



                }

            })
        }
    }



    return <div>
        <h3>Upload your <strong>first</strong>picture</h3>
        <form onSubmit={onSubmit}>
            <input type='file' onChange={captureFile}/>
            <input type='submit' value="Validate"/>
        </form>
        <GetDataForVerif numberArray={arrayNumber} stringArray={arrayString} ident={i} />

    </div>
}

export default GetImage;







/*
type Props = {

    readonly buffer?: ArrayBuffer;
    readonly ipfsHash?: string;
}





class GetImage extends React.Component<{},Props> {
    state:Props = {
            buffer: new ArrayBuffer(10),
            ipfsHash: '',

        }

        //captureFile.bind(this)
        //this.onSubmit.bind(this)




    captureFile(event:any){


        console.log("Capture file...")
        event.preventDefault()
        const file= event.target.files[0]
        const reader = new window.FileReader()
        reader.readAsArrayBuffer(file)

        reader.onloadend=()=>{

            console.log(typeof reader.result)
            const res: ArrayBuffer = reader.result as ArrayBuffer
            this.setState({buffer:res})
            console.log('buffer',this.state.buffer)
        }

        if(file && file.name) {
            EXIF.getData(file, function (){
                    var exifData = EXIF.pretty(this);
                    if(exifData){

                    const allMetaData = EXIF.getAllTags(this);
                    GetImgData(allMetaData)

                }else{
                    console.log("No EXIF found", file.name)
                }
            })
        }


    }

    onSubmit(event:any){
        const {buffer , ipfsHash} = this.props
        event.preventDefault()
        console.log('on submit...')
        ipfs.files.add(this.state.buffer, (error:any, result:any)=>{
                if (error){
                    console.error(error)
                    return
                }

                this.setState({ipfsHash: result[0].hash})
                //this.setState({lo})
                console.log('ipfshash :', this.state.ipfsHash)
            }
        )
    }
    <img src={`https://ipfs.io/ipfs/${}`} alt=""/>



    render() {

        return (
            <div className="App">
                <h1>Decentralised image storage</h1>


                <p>
                    Cette image est stocké sur ipfs et sur la blockchain ethereum
                </p>
                <h2>Votre image</h2>



                <h2>Téléchargez l'image</h2>
                <form>
                    <input type='file' onChange={this.captureFile}/>
                    <input type='submit'/>
                </form>

                <br/>


            </div>
        );
    }
}

export default GetImage;
*/





/*
const GetImage = () => {
    const [img, setImg] = useState();
    const [buffer, setBuffer] = useState();
    const [ipfsHash, setIpfsHash] = useState();

    const handleImgChange =(event:any)=>{
        event.preventDefault();
        const file = event.target.files[0];
        const reader = new FileReader()
        const read = reader.readAsArrayBuffer(file)
        console.log(read)


        reader.onloadend=()=>{
            //const res = new Buffer(reader.result)
            //setBuffer(res)
            //console.log('Buffer', buffer)

        }

    }

    const handleSubmit = (event:any) =>{
        event.preventDefault();
        console.log("your image is downloaded")
    }

    return <div>
        <h2>Upload your image on decentralised data storage</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Your Trash-Tag image</label>
                <input type="file" onChange={handleImgChange}/>
                <input type='submit'/>
            </div>

        </form>
    </div>

}
export default GetImage;

 */