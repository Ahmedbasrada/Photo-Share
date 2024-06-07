// الصفحة الرئيسية

import React, {useState,useEffect} from 'react';
import style from "./../../assets/css/home.module.css"
import Sidebar from '../sidebar/sidebar'
import AddPhoto from '../addPhoto';
import axios from 'axios'
import ImagePreview from '../imagePreview';
import Delete from '../delete';
import BigImage from '../big_image';






const Home = (props) =>{
    const {signOut, validate} = props  
    const[page , setPage] = useState('home')
    const[clicked, setCliced] = useState(false)
    const[addPhoto, setAddPhoto] = useState(false)
    const[view, setView] = useState(false)
    const [images, setImages] = useState(null)
    const [fetchDataMain, setfetchDataMain] = useState(false)
    const[visibal, setVisibal] = useState(false)
    const [id, setId] = useState(null)
    const [src, setSrc] = useState(null)
    const [title, setTitle] = useState(null)
    const [description, setDescription] = useState(null)
    const [isEdit, setIsEdit] = useState(false)
    const [isBigImage, setIsBigImage] = useState(false)
    const [blur,serBlur ] = useState(false)
    const [trash, setTrash] = useState(false)

    // العوده حالات تكبير واضافة و تعتيم الصور
    const photoState = () =>{
        setAddPhoto(false)
        setIsBigImage(false)
        serBlur(false)
        setTrash(false)
        fetchData()
    }

    // أستدعاء الداله المسؤوله عن أغلاق المعيقات في حال طلب البيانات
    useEffect(() =>{
        photoState()
    },[fetchDataMain])

    // الدالة المسؤولة عن أظهار نافذة الحذف
    const trashPop = (id, title)=>{
        setTrash(true)
        serBlur(true)
        setId(id)
        setTitle(title)
    }
    // العودة من نافذة الحذف
    const backTrash = (isFech) =>{
        setTrash(false)
        serBlur(false)
        if(isFech)   fetchData()

    }

    // الدالة المسؤولة عن أظهار الصورة المطلوب تكبيرها
const bigImage = (src, title , description, isEdit,id) =>{
        setSrc(src)
        setTitle(title)
        setDescription(description)
        setIsEdit(isEdit)
        setId(id)
        setIsBigImage(true)
        serBlur(true)
    }

    // تحويل الصفحات الخاصة بالصفحة الرئيسية
    const homePageSwitcher = (page) =>{
        if(page != 'home') setCliced(true)
        setPage(page)
        
}

    //    أعدادات صفحة معرض الصور
    const home = () =>{
        document.querySelector(`[class*="${style.gallery}"]`).innerHTML = 'معرض الصور'
        setfetchDataMain(false)
       
    }
    // أعدادات الصفحة الشخصية
    const personal = () =>{
        document.querySelector(`[class*="${style.gallery}"]`).innerHTML = 'صوري'
        setfetchDataMain(true)
        


    }
    // أجرائات تغيير الصفحة
    useEffect(() => {
        let gallery = document.querySelector(`[class*="${style.gallery}"]`)
    switch(page){
        case 'home':
            home()
            gallery.style.transition = 'null'
            if(clicked)gallery.style.left = '13vw'
            break;
        case 'personal':
            personal()
            gallery.style.transition = 'null'
            gallery.style.left = '17vw'
            break;
        case 'signOut':
            break
    }
        },[page])
        // طلب البيانات عند أول مره لفتح الصفحة الرئيسية
        useEffect(() => {
            fetchData();
        },[])
        //  عمليات طلب البيانات
        const fetchData = async () => {
            try {
                        setVisibal(false)

                let response
                if(fetchDataMain){
                    // طلب الصور الشخصية
                
                     response = await axios.get("http://localhost:4000/api/photos/myPhotos")
                }else{
                    // طلب جميع الصور
                    const id = localStorage.getItem('id')
                    response = await axios.get("http://localhost:4000/api/photos/allPhotos",{
                        params:{
                            id: id
                        }
                     })
                }
                
                 
                  setImages(response?.data);

                  if(response?.data.imageInfo.length != 0) setView(true);


                  else setView(false)

                   // اظهار اعدادات المسؤول
                    if(page =='personal' && localStorage?.getItem("name")){
                        setVisibal(true)
                    }else{
                        setVisibal(false)
                    }
            } catch (e) {
                validate(e.response?.data.massage)
                homePageSwitcher('home')

            }
        };

        // الأعدادات المظهرية لميكانيكة الصفحة الرئيسة
    const mousePointing = (e) =>{
        let gallery = document.querySelector(`[class*="${style.gallery}"]`)
        gallery.style.transition = '0.3s ease'
        if(e) {
            document.querySelector(`[class*="${style.HomeDiv}"]`).style.width = '81.5%'
            if( page == 'personal'){
                document.querySelector(`[class*="${style.gallery}"]`).style.left = '17vw'
            }else if( page == 'home'){
                document.querySelector(`[class*="${style.gallery}"]`).style.left = '13vw'
            }
        }else {
            document.querySelector(`[class*="${style.HomeDiv}"]`).style.width = '89%'
            if( page == 'personal'){
                document.querySelector(`[class*="${style.gallery}"]`).style.left = '24vw'
            }else if( page == 'home'){
                document.querySelector(`[class*="${style.gallery}"]`).style.left = '20vw'
            };
                }
       
        

    }

    

    return(
        <div className={style.bigBox}>
            <div className={style.topBar}>
            <h1 className={style.gallery} >معرض الصور</h1>
            <div className={style.addPhoto}>
            <button className={style.button} onClick={() => {
                setAddPhoto(true)
                setIsBigImage(false)
            }
                } type="button">
            <span className={`${style.button__text}${style.bold}`}>إضافة صورة</span>
            <span className={style.button__icon}><svg className={style.svg} fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><line x1="12" x2="12" y1="5" y2="19"></line><line x1="5" x2="19" y1="12" y2="12"></line></svg></span>
            </button>
            </div>
            </div>
            <div className={style.HomeDiv}>
                {trash && <Delete backTrash={backTrash} validate={validate} ImagePreviews ={images.imagePreviews} id={id} title={title}/>}
                {isBigImage  && <BigImage id={id}src={src} title={title} isEdit = {isEdit} photoState={photoState} description ={description} validate ={validate} />}
                {addPhoto ? <AddPhoto photoState={photoState} validate ={validate} /> :  <ImagePreview  trashPop = {trashPop}blur ={blur}bigImageFun={bigImage} view = {view} images = {images} visibal={visibal} validate={validate}   fetchData={fetchData}/> }
            </div>
            <Sidebar validate={validate} photoState={photoState} mousePointing ={mousePointing} signOut = {signOut} clicked = {clicked} homePageSwitcher = {homePageSwitcher}/>
        </div>
    )
}


export default Home