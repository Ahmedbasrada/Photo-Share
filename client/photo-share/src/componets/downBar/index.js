import React from "react";
import axios from 'axios'

 


const DownBar = (props)=>{
    const {cliked, validate, guest,
    image, images, visibal} = props

    // عملية أضافة لايك.
 const like = async (id) =>{
    let like  = document.getElementById(`${id}_input`)
    try{   
        let data = {
            imageId: id
        }
        const response = await axios.post("https://photoshare-server.vercel.app/api/photos/like",data)
        let likeCounter = document.getElementById(`${id}_likeCounter`) 
        if(response?.data.likeSituation === 'like'){
            likeCounter.innerHTML = parseInt(likeCounter.innerHTML) + 1
            like.checked = true
        }else{
            likeCounter.innerHTML = parseInt(likeCounter.innerHTML) - 1
            like.checked = false
        }
    }catch(e){
        like.checked = false
        validate(e.response?.data.massage)
    }
}

    return(
        <>
        <hr/>
            {guest
            ?
            <>
                <input  className="like" id={`${image._id}_input`}  checked disabled type="checkbox" title="like" />
                <span ><h4 className="likeCounter" id={`${image._id}_likeCounter`}>{image.likes}</h4></span>
            <div className="checkmark">

                <svg  xmlns="http://www.w3.org/2000/svg" style={{fill: "gray"} } height="1.8vw" width="1.8vw"className="filled" viewBox="0 0 24 24">
                        <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
                        </svg>
                
            </div>
                </>             
                :
            
            
                <>
                {images.liked.find( item => item.photo.includes( image._id))
                ?
                <input onClick={() => like(image._id)} className="like" id={`${image._id}_input`} checked type="checkbox" title="like" />
                :
                <input onClick={() => like(image._id)} className="like" id={`${image._id}_input`} type="checkbox" title="like" />
                }
                    <span ><h4 className="likeCounter" id={`${image._id}_likeCounter`}>{image.likes}</h4></span>
                    <div className="checkmark">

                        <svg xmlns="http://www.w3.org/2000/svg" height="1.8vw" width="1.8vw" className="outline" viewBox="0 0 24 24">
                        <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z"></path>
                        </svg>
                        <svg  xmlns="http://www.w3.org/2000/svg" height="1.8vw" width="1.8vw"className="filled" viewBox="0 0 24 24">
                        <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
                        </svg>
                    </div>
                </>
                    }


                
  {visibal && 
  <div className="adminBtns">
  <svg xmlns="http://www.w3.org/2000/svg" onClick={ e => cliked(image._id, 'trash')} className='pointer trash'width='1.4vw' height='1.4vw' viewBox="0 0 448 512"><path fill="#93969a" d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"/></svg>
  <svg xmlns="http://www.w3.org/2000/svg" onClick={ e => cliked(image._id, true)} className='pointer edit' width='1.4vw' height='1.4vw' viewBox="0 0 512 512"><path fill="#808080" d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"/></svg>
    </div>
}
</>
    )
}

export default DownBar