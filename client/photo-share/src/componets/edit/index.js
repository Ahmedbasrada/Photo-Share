import React, {useState, useEffect} from "react";
import style from  "./../../assets/css/bigImage.module.css"
import axios from "axios";


const Edit = (props) =>{
    const {src, title, description, photoState, isEdit, id, validate, close} = props
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
          validate("تم حفظ التغييرات" , true )
          close()
        }catch(e){
        validate(e.response?.data.massage)
        }
      }

    return(
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
    
    )
}

export default Edit