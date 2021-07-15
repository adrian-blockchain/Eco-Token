export const verification = (allMetaDataImg1:any, allMetaDataImg2:any):boolean=> {

    if (allMetaDataImg1.GPSLongitude !==undefined){

        const directionTolerance1: number = allMetaDataImg2.GPSImgDirection.numerator / allMetaDataImg2.GPSImgDirection.denominator - 10;
        const directionTolerance2: number = allMetaDataImg2.GPSImgDirection.numerator / allMetaDataImg2.GPSImgDirection.denominator + 10;



            if (
                allMetaDataImg1.GPSLongitude[0].numerator / allMetaDataImg1.GPSLongitude[0].denominator === allMetaDataImg2.GPSLongitude[0].numerator / allMetaDataImg2.GPSLongitude[0].denominator
                && allMetaDataImg1.GPSLongitude[1].numerator / allMetaDataImg1.GPSLongitude[1].denominator === allMetaDataImg2.GPSLongitude[1].numerator / allMetaDataImg2.GPSLongitude[1].denominator
                && allMetaDataImg1.GPSLongitude[2].numerator / allMetaDataImg1.GPSLongitude[2].denominator === allMetaDataImg2.GPSLongitude[2].numerator / allMetaDataImg2.GPSLongitude[2].denominator
                && allMetaDataImg1.GPSLongitudeRef === allMetaDataImg2.GPSLongitudeRef
                && allMetaDataImg1.GPSLatitude[0].numerator / allMetaDataImg1.GPSLatitude[0].denominator === allMetaDataImg2.GPSLatitude[0].numerator / allMetaDataImg2.GPSLatitude[0].denominator
                && allMetaDataImg1.GPSLatitude[1].numerator / allMetaDataImg1.GPSLatitude[1].denominator === allMetaDataImg2.GPSLatitude[1].numerator / allMetaDataImg2.GPSLatitude[1].denominator
                && allMetaDataImg1.GPSLatitude[2].numerator / allMetaDataImg1.GPSLatitude[2].denominator === allMetaDataImg2.GPSLatitude[2].numerator / allMetaDataImg2.GPSLatitude[2].denominator
                && allMetaDataImg1.GPSLatitudeRef === allMetaDataImg2.GPSLatitudeRef
                && directionTolerance1 < (allMetaDataImg1.GPSImgDirection.numerator / allMetaDataImg1.GPSImgDirection.denominator)
                && (allMetaDataImg1.GPSImgDirection.numerator / allMetaDataImg1.GPSImgDirection.denominator) < directionTolerance2
            ) {
                return true;
            } else {
                return false
            }

        }
        return false



}

export default verification;