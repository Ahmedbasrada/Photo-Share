// صفحة أنشاء الحساب

import React from "react";
import style from "./../../assets/css/signUp.module.css"
import axios from "axios";


const signUp = (props) => {
  const {pageSwitcher, validate} = props

  // الأشعار بالأخطاء
  const validateList = (err) =>{
   validate(err)
 }

//  ادخال البيانات
const Submit = async (e) =>{
 e.preventDefault();
 const name = document.querySelector('#nameInput').value 
 const email = document.querySelector('#emailInput').value
 const password = document.querySelector('#passwordInput').value 
 const checkPassword = document.querySelector('#checkPasswordInput').value
 
//  الأخطاء المتوقعة قبل الذهاب للخادم
 if (!email || !password || !name || !checkPassword ) {
   return validateList('عليك ملئ جميع الفراغات')

 }

   if(password != checkPassword){
      return validateList('كلمة المرور و تأكيد كلمة المرور غير متطابقين')

   }
   const data = {
      name: name,
      email: email, 
      password: password,
      cnofigPassword: checkPassword
    }
    // عملية تسجيل وأنشاء الحساب
   try{
     const response = await axios.post("https://photoshare-server.vercel.app/api/auth/register", data)
     localStorage.setItem('name', response.data.name) 
     localStorage.setItem('id', response.data.id)
     localStorage.setItem('token', response.data.accessToken)
     axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`
     pageSwitcher('home')

   }catch (e){
     validateList(e.response?.data.massage)
   }
     ;
 
}

  return(
    <>
    <div className={style.container}>
        <h1 className={style.login}>إنشاء الحساب</h1>
        <form>
        <div className={style.allInput}>
        <div className={style.inputbox}>
    <input className={style.bold} id="nameInput" required="required" type="text"/>
    <i></i>
    </div>
       <h3 className={style.label}>الأسم</h3>
       <div className={style.email}>
        <div className={style.inputbox}>
    <input className={style.bold} id="emailInput" required="required" type="text"/>
    <i></i>
    </div>
       <h3 className={style.label}>البريد الألكتروني</h3>
       </div>

       <div className={style.password1}>
       <div className={style.inputbox}>
    <input className={style.bold} id="passwordInput" required="required" type="password"/>
    <i></i>
    </div>
       <h3 className={style.label}>كلمة المرور</h3>
       </div>
       <div className={style.password2}>
       <div className={style.inputbox}>
    <input className={style.bold} id="checkPasswordInput" required="required" type="password"/>
    <i></i>
    </div>
       <h3 className={style.label}>تأكيد كلمة المرور</h3>
       </div>
    </div>
    <button className={`${style.btn} ${style.bold}`} onClick={event => Submit(event) }>إنشاء الحساب</button>
    </form>
    <a href="#" className={style.returnLogin} onClick={event => pageSwitcher('login')}>تسجيل الدخول</a>
    </div>
    
    
    </>
  )
  }

export default signUp