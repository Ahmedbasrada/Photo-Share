// أظهار أشعارات الأخطاء

import React, { useEffect } from "react";

const Alert = (props) =>{

    // تحديد لون الأشعار
    useEffect(() => {
            if(props.validationMassage[props.validationMassage.length -1][1]){
                console.log(props.validationMassage[props.validationMassage.length -1][1])
                document.querySelector('.alert-container').style.backgroundColor = 'green'
                
            }else{
                
                document.querySelector('.alert-container').style.backgroundColor = 'red'

            }

    },[props])
   

    return(
    <div className="alert-container">
        <ul dir="rtl">
            {props.validationMassage.map((massage,index) => <li  key={index}>{massage[0]}</li>)}
        </ul>
    </div>
)
        }

export default Alert