// عملية أظهار الصور

import React, {useEffect} from "react";
import "./../../assets/css/imagePreview.css";
import DownBar from "../downBar";
const ImagePreview = (props) => {
    const { images, view,visibal, validate,bigImageFun , blur,
        trashPop , guest} = props;

        useEffect(() =>{

        },[images])
        // المظهر الضبابي
    useEffect(() =>{
        if(!blur && document.querySelector('.wrap')) {
            document.querySelector('.wrap').style.filter =  ''
        }
    },[blur])
   

    // في حال عدم توفر الصور
        if (!view) {
            return <div>
                !لا تتوفر صور للعرض
                </div>;
        }

        



       


        // أعدادات في حال الضغط على الصورة
        const cliked = (id, isEdit) =>{
            const title = document.getElementById(`${id}_title`).innerHTML
            document.querySelector('.wrap').style.filter =  'blur(8px)'
            if(isEdit == 'trash') return trashPop(id, title)
            const image = document.getElementById(`${id}_image`).src
            const description = document.getElementById(`${id}_description`).innerHTML
            bigImageFun(image, title, description, isEdit,id) 
        }
        

        return (
            <div className="wrap">
                {images.imageInfo.map((image, index) => (
                    
                    <div className="card" key={index}>
    
                        <div className="card-image-container" onClick={ e => cliked(image._id, false)}>
                            <img id={`${image._id}_image`}src={ image.imageURL}
                            
                            height='100%' width='100%' alt={`Image ${index}`} />
                        </div>
                        
                        <p className="card-title" dir="rtl" id={`${image._id}_title`}>{image.title}</p>
                        <p className="card-des" dir="rtl" id={`${image._id}_description`}>{image.description}</p>
                        <div className="downBar">
                            <DownBar cliked={cliked} visibal={visibal} validate ={validate} image={image} images={images} guest ={guest}/>
                        </div>
    
                        
                       
                    </div>
                ))}
            </div>
        );
    
}


export default ImagePreview;
