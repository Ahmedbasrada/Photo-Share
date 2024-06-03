// صفحة تسجيل الدخول
import React from "react";
import style from "./../../assets/css/login.module.css"
import axios from 'axios'


const Login = (props) => {
  const {pageSwitcher , validate} = props

  // الأشعار بالأخطاء
  const validateList = (err) =>{
    validate(err)
  }

  // أدخال البيانات
const Submit = async (e) =>{
  e.preventDefault();
  const email = document.querySelector('#emailInput').value 
  const password = document.querySelector('#passwordInput').value
  
  // الأخطاء المتوقعة قبل ألارسال للخادم
  if (!email || !password) {
    return validateList('عليك ملئ جميع الفراغات')
    }
    const data = {
      email: email, 
      password: password
    }
    // عملية تسجيل الدخول
    try{
      const response = await axios.post("http://localhost:4000/api/auth/login", data)
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
        <br/>
        <h5 className={style.logoName} >ناشر الصور</h5>
        <h1 className={style.login}>تسجيل الدخول</h1>
        <form onSubmit={e => Submit(e)}>
        <div className={style.allInput}>
        <div className={style.inputbox}>
    <input className={style.bold} id='emailInput'required="required" type="text"/>
    <i></i>
    </div>
       <h3 className={style.label}>البريد الألكتروني</h3>

       <div className={style.inputbox}>
    <input className={style.bold} id='passwordInput' required="required" type="password"/>
    <i></i>
    </div>
       <h3 className={style.label}>كلمة المرور</h3>
       

    </div>
    <button  className={`${style.btn} ${style.bold}`}  > تسجيل الدخول</button>
    </form>
    <a href="#" className={style.gaist} onClick={event => pageSwitcher('home')}> الدخول كضيف</a>
    <a href="#" className={style.signUp} onClick={event => pageSwitcher('signUp')}>إنشاء حساب؟</a>
    </div>
    
    
    </>
  )
  }

export default Login