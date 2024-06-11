import { Login, SignUp, Home} from './componets/index';
import './App.css';
import  "./index.css"
import React, {useState,useEffect} from 'react';
import Alert from './componets/alert'
import axios from 'axios'






function App() {
  // المسؤول عن نوع الصفحة 
  const [page, setPage] = useState('login')
  const [validationErrors, setValidationErrors] = useState([])
  
  // في حال كان المستخدم لدية حساب
  // ومسجل الدخول مسبقا
  useEffect(()=>{
  const token = localStorage.getItem("token")
  if(token){
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    setPage('home')
    }
    
  },[])

  // وقت انتهاء الاشعار بالأخطاء
  useEffect(()=>{
    if(validationErrors.length !== 0){
      setTimeout(() =>{
        setValidationErrors([])
      }, 3000)
    }
  },[validationErrors])

// الأشعار بالأخطاء
  const validate = (err, isGreen) =>{
    err = [err , isGreen]
    setValidationErrors(validationErrors=> [...validationErrors, err ])
  }
  
  // عملية تسجيل الخروج
  const signOut = () =>{
    axios.defaults.headers.common['Authorization'] = null
    localStorage.clear()
    setPage('login')
  }
  // الدالة المسؤولة عن تغيير الصفحات الرئيسية
  const pageSwitcher = (page) =>{
    
    setPage(page)
  }


  switch(page){
    case 'login':
      return (
        <>
       <Login pageSwitcher={pageSwitcher} validate ={validate}/>
       {validationErrors.length !== 0 && <Alert validationMassage={validationErrors}/>}

       </>
      );
      break;
      case 'signUp':
      return (
        <>
      <SignUp pageSwitcher={pageSwitcher} validate ={validate}/>
      {validationErrors.length !== 0 && <Alert validationMassage={validationErrors}/>}
       </>
      );
      break;

      case 'home':
      return (
        <>
      <Home signOut = {signOut}  validate ={validate}/>
      {validationErrors.length !== 0 && <Alert validationMassage={validationErrors}/>}
       </>
      );
      break;

  }
  
}

export default App;
