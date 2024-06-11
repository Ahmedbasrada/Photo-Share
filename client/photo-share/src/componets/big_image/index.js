// علمية تكبير الصورة

import React, {useState, useEffect} from "react";
import style from  "./../../assets/css/bigImage.module.css"
import Edit from "../edit";
import View from "../view";




const BigImage = (props) =>{
    const {src, title, description, photoState, isEdit, id, validate} = props
    
      // الدالة المسؤولة عن الأغلاق
    const close = () =>{
        photoState()
    }

    

    return(
        <div className={style.body}>
          <div className={style.closeDiv} onClick={() => close()}></div>
             <svg xmlns="http://www.w3.org/2000/svg" onClick={() => close()} className={style.close} width={35} height={35} viewBox="0 0 384 512">
                <path fill="#515152" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
            </svg>
        <div className={style.card}>
  <div className={style.imageContainer}>
    <div className={style.image}>
      <img src={src} width='100%' height='100%' />
    </div>
  </div>
   
    {isEdit 
    ?
   <Edit id={id}src={src} title={title} isEdit = {isEdit} photoState={photoState} description ={description} validate ={validate} close={close}/>
   :

   <View title={title} description={description} close = {close}/>
    }
</div>

        </div>
    )
}


export default BigImage