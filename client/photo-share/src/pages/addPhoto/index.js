// صفحة أضافة الصور

import React, { useEffect, useState } from "react";
import style from "./../../assets/css/addPhoto.module.css";
import axios from 'axios';
import cameraBackground from './../../assets/appPhoto/cameraBackground.png';

const AddPhoto = (props) => {
    const { photoState, validate, fetchData } = props;
    const [file, setFile] = useState(null);

    const viewImage = () => {
        const imagePreview = document.getElementById('imagePreview');
        document.querySelector(`[class*="${style.photoView}"]`).style.backgroundImage = '';
        
        // في حال أضافة صوره وفي حال عدمة
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                imagePreview.src = event.target.result;
            };
            reader.readAsDataURL(file);
        } else {
            imagePreview.src = cameraBackground;
        }
    };
    // أعدادات أضافة الصورة عنطريق السحب والأفلات
    useEffect(() => {
        const dropArea = document.querySelector(`[class*="${style.design}"]`);

        dropArea.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        dropArea.addEventListener('drop', (e) => {
            e.preventDefault();
            const droppedFile = e.dataTransfer.files[0];
            setFile(droppedFile);
            viewImage();
        });

        // أضافة الصوره عنطريق الضغط على الزر
        const inputFile = document.querySelector('#file');
        inputFile.addEventListener('change', (event) => {
            const selectedFile = event.target.files[0];
            setFile(selectedFile);
            viewImage();
        });
    }, []);

    // أظهار الصورة المختاره
    useEffect(() => {
      if (file) {
          viewImage();
      }
  }, [file]);
//   عملية اضافة الصورة
    const Submit = async (e) => {
        e.preventDefault();
        // جلب البيانات
        const imagePreview = document.getElementById('imagePreview');
        const title = document.querySelector('#title').value;
        const description = document.querySelector('#description').value;

        // تجهيز الأرسال و الأرسال
        const formData = new FormData();
        formData.append('image', file);
        formData.append('title', title);
        formData.append('description', description);
        try {
            const response = await axios.post("https://photoshare-server.vercel.app/api/photos/upload", formData);
            validate("تم إضافة الصورة" , true )
            photoState()
        } catch (e) {
            console.log(e)
            validate(e.response?.data.message);
        }
    };

    return (
        <form>
            <svg xmlns="http://www.w3.org/2000/svg" onClick={() => photoState()} className={style.close} width={35} height={35} viewBox="0 0 384 512">
                <path fill="#515152" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
            </svg>
            <div className={style.div}>
                <div className={style.form}>
                    <label htmlFor="file" className={style.label}>
                        <div className={style.design}>
                            <svg viewBox="0 0 640 512" height="1em">
                                <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"/>
                            </svg>
                            <p>إسحب و أفلت</p>
                            <p>أو</p>
                            <span className={style.button}>تصفح الملفات</span>
                        </div>
                        <input id="file"  dir="rtl" type="file" accept=".jpeg, .png" />
                    </label>
                </div>
            </div>
            <div className={style.photoView}>
                <img id="imagePreview" src={cameraBackground} width="100%" height='100%' alt="صورة الملف المحدد" />
            </div>
            <h2 className={style.title}>العنوان</h2>
            <input placeholder="أضف العنوان هنا" id='title'  dir="rtl" className={`${style.fileInput} ${style.bold}`} type="text" />
            <div className={style.description}>
                <h2 className={style.title}>الوصف</h2>
                <input placeholder="أضف الوصف هنا"  dir="rtl" id='description' className={`${style.fileInput} ${style.bold}`} type="text" />
                <div className={style.uploadDiv}>
                    <button className={style.uploadButton} onClick={(e) => Submit(e)}>
                        <svg viewBox="0 0 640 512" fill="white" height="1em" xmlns="http://www.w3.org/2000/svg">
                            <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"/>
                        </svg>
                        <span>إرفع</span>
                    </button>
                </div>
            </div>
        </form>
    );
};

export default AddPhoto;
