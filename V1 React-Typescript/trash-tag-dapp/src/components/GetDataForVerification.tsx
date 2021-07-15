// @ts-ignore
import React, {useState} from "react";





export const GetDataForVerif =(img1:any, img2:any)=>{

    if (
        img1.GPSLongitudeDegrees == img2.GPSLongitudeDegrees
        && img1.GPSLongitudeMinutes == img2.GPSLongitudeMinutes
        && img1.GPSLongitudeSeconds == img2.GPSLongitudeSeconds
        && img1.GPSLongitudeRef == img2.GPSLongitudeRef
        && img1.GPSLatitudeDegrees == img2.GPSLatitudeDegrees
        && img1.GPSLatitudeMinutes == img2.GPSLatitudeMinutes
        && img1.GPSLatitudeSeconds == img2.GPSLatitudeSeconds
        && img1.GPSLatitudeRef == img2.GPSLatitudeRef
        && img1.GPSImgDirection == img2.GPSImgDirection
        && img1.DateTime == img2.DateTime
    ){
        return(<div>
            <h1>Congrats your trash tag has been approved</h1>
        </div>)
    }


}

export default GetDataForVerif;
