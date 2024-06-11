import React from "react";
import style from  "./../../assets/css/bigImage.module.css"




const View = (props) => {
    const {title, description} = props
    return(
        <div>
        <div className={style.titleShow}>
        <h1>{title}</h1>
      </div>
      <div className={style.descriptionShow}>
        <h3>{description}</h3>
        
      </div>
      </div>
    )
}

export default View