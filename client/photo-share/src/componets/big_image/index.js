// علمية تكبير الصورة

import React, {useState, useEffect} from "react";
import style from  "./../../assets/css/bigImage.module.css"
import axios from "axios";




const BigImage = (props) =>{
    const {src, title, description, photoState, isEdit, id, validate} = props
    const [titleValue, setTitleValue] = useState(null)
    const [descriptionValue , setDescriptionValue] = useState(null)

  // البدء وتغيير الصوره
  // تغيير الصورة مرة أخرى
  useEffect(() =>{
    Start()
    },[id])
    // البدء لأضافة البيانات
    useEffect(() =>{
      Start()
      },[])
  
  // أضافة العنوان و الوصف
      const Start = () =>{
        setTitleValue(title)
        setDescriptionValue(description)
      }
      // الدالة المسؤولة عن الأغلاق
    const close = () =>{
        photoState()
    }

    // أعدادات الكتابة في الخانات
    const change = (e , type ) =>{
      if(type == 'title') setTitleValue( e.target.value)
      else setDescriptionValue(e.target.value)
    }

    // عملية حفظ التغييرات
    const Save = async () =>{
      const data = {
        title: titleValue,
        description: descriptionValue,
        imageId: id
      }

      try{
        await axios.put('http://localhost:4000/api/photos/modify',data)
        close()
      }catch(e){
      validate(e.response?.data.massage)
      }
    }

    return(
        <div className={style.body}>
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
    <>
    <div className={style.inputModiy}>
    <div className={style.form}>
    <input className={style.input}  dir="rtl" placeholder={`${title}`} required=""  type="text" onChange={(e) => change(e, 'title')} value={`${titleValue}`}/>
    <span className={style.inputBorder}></span>
</div>
   </div>

   <div className={style.inputModiy}>
    <div className={style.form}>
    <input className={style.input}  dir="rtl" placeholder={`${description}`} required=""  type="text" onChange={(e) => change(e, 'description')} value={`${descriptionValue}`}/>
    <span className={style.inputBorder}></span>
</div>
   </div>

   <button onClick={() => Save()}>
  <span className={style.button_top}> 
  حفظ
  </span>
</button>
   
   </>

   :
   <div>
   <div className={style.titleShow}>
   <h1>{title}</h1>
 </div>
 <div className={style.descriptionShow}>
   <h3>{description}</h3>
   
 </div>
 </div>


    }
</div>

        </div>
    )
}


export default BigImage