// نافذة حذف البيانات

import React from "react";
import style from "./../../assets/css/delete.module.css"
import axios from "axios";



const Delete = (props) =>{

    const {id, title, backTrash, ImagePreviews,validate} = props
    // علمية طلب حذف الصورة
    const Delete = async() =>{
      // الحصول على الأسم الكامل المتواجد على الخادم
        const imageName = ImagePreviews.find((item) => item.name.includes(id))?.name
        try{
        await axios.delete("http://localhost:4000/api/photos/delete" ,{
            params:{
                imageId: id,
                imageName:imageName,
            }
        })
        validate("تم الحذف بنجاح", true)
        backTrash(true)
        }catch(e){
            validate(e.response?.data.massage)

        }
    }
    

    return(
    <>
              <div className={style.closeDiv} onClick={() => backTrash(false)}></div>

        <div className={style.container}>
            <h1>حذف الصورة</h1>
            <h3>"هل أنت متأكد من رغبتك في حذف "{title}</h3>

            <button onClick={() => Delete()}type="button" className={style.button}>
        <span className={style.button__text}>حذف</span>
        <span className={style.button__icon}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="512"
        height="512"
        viewBox="0 0 512 512"
        className={style.svg}
      >
        <title></title>
        <path
          style={{ fill: 'none', stroke: '#323232', strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: '32px' }}
          d="M112,112l20,320c.95,18.49,14.4,32,32,32H348c17.67,0,30.87-13.51,32-32l20-320"
        ></path>
        <line
          y2="112"
          y1="112"
          x2="432"
          x1="80"
          style={{ stroke: '#323232', strokeLinecap: 'round', strokeMiterlimit: 10, strokeWidth: '32px' }}
        ></line>
        <path
          style={{ fill: 'none', stroke: '#323232', strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: '32px' }}
          d="M192,112V72h0a23.93,23.93,0,0,1,24-24h80a23.93,23.93,0,0,1,24,24h0v40"
        ></path>
        <line
          y2="400"
          y1="176"
          x2="256"
          x1="256"
          style={{ fill: 'none', stroke: '#323232', strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: '32px' }}
        ></line>
        <line
          y2="400"
          y1="176"
          x2="192"
          x1="184"
          style={{ fill: 'none', stroke: '#323232', strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: '32px' }}
        ></line>
        <line
          y2="400"
          y1="176"
          x2="320"
          x1="328"
          style={{ fill: 'none', stroke: '#323232', strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: '32px' }}
        ></line>
      </svg>
    </span> </button>
    <button onClick={() => backTrash(false)} className={style.backButton}>
  التراجع →
</button>

        </div>
        </>
    )

}

export default Delete