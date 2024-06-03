// القائمة الجانبية

import React,{useEffect, useState}from "react";
import "./../../assets/css/sidebar.css"
import img from "../../assets/appPhoto/logo.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



const Sidebar = (props) => {
  const {homePageSwitcher , clicked, signOut, validate,photoState} = props

  // أعدادات مظهرية لميناكية المظهر 
  const [hoverd, setHoverd] = useState('home')
  const[name , setName] = useState(null)



  // أعدادات في حال الضغظ
  const Click = (e,page) =>{
    if(!localStorage.getItem('name')) return validate('غير مصرح بك');
    let element = document.querySelectorAll('.command')
    element.forEach(item => {
      item.style.backgroundColor = 'rgb(31, 31, 31)'
      item.className = 'command'
    })
    e.currentTarget.style.backgroundColor = "rgb(73, 73, 73)"
    setHoverd(e.currentTarget.id)
    homePageSwitcher(page)
    photoState()
  }
  useEffect(() => {
  document.querySelector("#home").style.backgroundColor = "rgb(73, 73, 73)";
  },[])
  
  const hover = (e) =>{
    e.currentTarget.style.backgroundColor = "rgb(73, 73, 73)"
  
  }
  const unHover = (e) =>{
    if(hoverd !== e.currentTarget.id){
      e.currentTarget.style.backgroundColor = 'rgb(31, 31, 31)'
    }
  }

  

  return(
    <div onMouseOverCapture={async event => {
      props.mousePointing(true)
      setName(localStorage.getItem('name'))
      
      }} onMouseOut={event => {
        props.mousePointing(false)
        setName(null)
        document.getElementById('home').style.top = '0vw'


        }} >
             <div className="sBar">
        <ul>
            <li>
              <a className="homeName">
                      <span>ناشر الصور</span>
                      <img src={img} className="homeLogo" width={25} height={25}/>

              </a>
              </li>
              <hr/>
              <div className="Allcommands">
            <li className="command" id="personal" onMouseOverCapture={event => hover(event)} onMouseOut={event => unHover(event)}onClick={event => Click(event, "personal")}>
              <a href="#">
                <span>الملف الشخصي</span>
                <svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} viewBox="0 0 448 512"><path fill="#f5f5f5" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>
              </a>
              <div className='nameHolder'>
              {name ? <h5>( {name} )</h5> : '' }
              </div>
              </li>
              
            <li className="command" id="home" onMouseOverCapture={e => hover(e)}onMouseOut={event => unHover(event)} onClick={event => Click(event, "home")}>
              <a href="#">
                    <span>المعرض</span>
          <svg xmlns="http://www.w3.org/2000/svg" width={15}height={15} viewBox="0 0 576 512"><path fill="#f1f2f4" d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg> 
                       </a>
              </li>
            <li className="command" id="signOut" onMouseOverCapture={e => hover(e)}onMouseOut={event => unHover(event)} onClick={event => {Click(event,'signOut'); signOut()}} >
              <a href="#">
                
                    <span>تسجيل الخروج  </span>
                    <svg xmlns="http://www.w3.org/2000/svg" width={15}height={15} viewBox="0 0 512 512"><path fill="#f6f7f9" d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z"/></svg>
              </a>
              </li>
              </div>
        </ul>
    </div>
    </div>
  )
}


export default Sidebar