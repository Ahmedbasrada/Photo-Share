// أظهار أشعارات الأخطاء

import React from "react";

const Alert = (props) =>(
    <div className="alert-container">
        <ul dir="rtl">
            {props.validationMassage.map((massage,index) => <li key={index}>{massage}</li>)}
        </ul>
    </div>
)

export default Alert