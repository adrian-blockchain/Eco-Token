// @ts-ignore
import {NFTStorage, Blob} from 'nft.storage'

const info = require("./../config.json")

const apiKey = info.apiKey

const client = new NFTStorage({token: apiKey})




export const MetadataExport =async (metadataImg1:any, metadataImg2:any, hashimg1:string, hashimg2:string): Promise<string> => {

    let imgObj = [
        {
            IdImg:1,
            ImgHash:`https://ipfs.io/ipfs/${hashimg1}`,
            /*
            GPSLongitudeDegrees:metadataImg1.GPSLongitude[0].numerator / metadataImg1.GPSLongitude[0].denominator,
            GPSLongitudeMinutes:metadataImg1.GPSLongitude[1].numerator / metadataImg1.GPSLongitude[1].denominator,
            GPSLongitudeSeconds:metadataImg1.GPSLongitude[2].numerator / metadataImg1.GPSLongitude[2].denominator,
            GPSLongitudeRef:metadataImg1.GPSLongitudeRef,
            GPSLatitudeDegrees:metadataImg1.GPSLatitude[0].numerator / metadataImg1.GPSLatitude[0].denominator,
            GPSLatitudeMinutes:metadataImg1.GPSLatitude[1].numerator / metadataImg1.GPSLatitude[1].denominator,
            GPSLatitudeSeconds:metadataImg1.GPSLatitude[2].numerator / metadataImg1.GPSLatitude[2].denominator,
            GPSLatitudeRef:metadataImg1.GPSLatitudeRef,
            GPSImgDirection:metadataImg1.GPSImgDirection.numerator / metadataImg1.GPSImgDirection.denominator,
            DateTime:metadataImg1.DateTime,

             */
        },
        {
            IdImg: 2,
            ImgHash:`https://ipfs.io/ipfs/${hashimg2}`,
            /*
            GPSLongitudeDegrees:metadataImg2.GPSLongitude[0].numerator / metadataImg2.GPSLongitude[0].denominator,
            GPSLongitudeMinutes:metadataImg2.GPSLongitude[1].numerator / metadataImg2.GPSLongitude[1].denominator,
            GPSLongitudeSeconds:metadataImg2.GPSLongitude[2].numerator / metadataImg2.GPSLongitude[2].denominator,
            GPSLongitudeRef:metadataImg2.GPSLongitudeRef,
            GPSLatitudeDegrees:metadataImg2.GPSLatitude[0].numerator / metadataImg2.GPSLatitude[0].denominator,
            GPSLatitudeMinutes:metadataImg2.GPSLatitude[1].numerator / metadataImg2.GPSLatitude[1].denominator,
            GPSLatitudeSeconds:metadataImg2.GPSLatitude[2].numerator / metadataImg2.GPSLatitude[2].denominator,
            GPSLatitudeRef:metadataImg2.GPSLatitudeRef,
            GPSImgDirection:metadataImg2.GPSImgDirection.numerator / metadataImg2.GPSImgDirection.denominator,
            DateTime:metadataImg2.DateTime

             */
        }
    ]
    const ImgObjectJson = JSON.stringify(imgObj)

    const ImgObjectBlob = new Blob([ImgObjectJson])


    const cid:string = await client.storeBlob(ImgObjectBlob)



    console.log(cid)
    return cid



}
export default MetadataExport;