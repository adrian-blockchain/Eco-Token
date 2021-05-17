import React,{useState} from "react";




const GetImage = () => {
    const [img, setImg] = useState();

    const handleImgChange =(event:any)=>{
        setImg(event.target)
    }

    const handleSubmit = (event:any) =>{
        event.preventDefault();
        console.log("your image is download")
    }

    return <div>
        <h2>Upload your image on decentralised data storage</h2>
        <form onSubmit={handleSubmit}>
            <div>
            <label>Your Trash-Tag image</label>
            <input
            type="image"
            name="image"
            placeholder="Upload your image here"
            onChange={handleImgChange}
            value={img}
            />
            </div>
            <button type="submit">Upload</button>
        </form>
    </div>

}

export default GetImage;