require("dotenv").config()
const jwtHelpers = require('../utils/jwtHelpers')
const Likes = require('../module/likes')
const Photos = require('../module/photos')
const path = require("path")
const fs = require("fs")
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;


// رفع الصور 
exports.upload = async (req, res) => {
   
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({message: 'لم يتم تحميل أي صورة.'});
    }
    console.log(1)


    
    console.log(2)


    // استقبال الصورة من الطلب
    const image = req.files.image;
    const { title, description } = req.body;
    console.log(3)

    // الأخطاء المتوقعة
    if (!title || !description) {
        return res.status(401).json({message: "يرجى أضافة عنوان ووصف للصورة"});
    }
    if (title.length > 16) {
        return res.status(401).json({message: `أحرف العنوان يجب أن لا تتجاوز 15 حرف. عدد الأحرف المكتوبة ${title.length}`});
    }
    if (description.length > 81) {
        return res.status(401).json({message: `أحرف الوصف يجب أن لا تتجاوز 80 حرف. عدد الأحرف المكتوبة ${description.length}`});
    }
    console.log(4)


    let extname = path.extname(image.name);

    if (extname !== '.jpeg' && extname !== '.png') {
        return res.status(415).json({message: `لا تقبل إلا ملفات من صيغة .png و .jpeg. صيغة الملف المرسل هي ${extname}`});
    }

    const uploadPath = path.join(__dirname, '..', 'photosStore');
    const imagePath = path.join(uploadPath, Date.now() + extname);
    console.log(5)

    // حفظ الصورة في المسار المحدد على الخادم
   


    let imageURL = null;
    let public_id
    try {
        const result = await cloudinary.uploader.upload(image.tempFilePath);
        imageURL = result.url;
        public_id = result.public_id;
        } catch (error) {
        return res.status(500).json({message: error.path});
    }
    console.log(7)

    // حفظ بيانات الصورة
    try {
        const photo = new Photos({
            title: title,
            description: description,
            user: req.userId,
            imageURL: imageURL,
            public_id:public_id
        });
        await photo.save();
    } catch (e) {
        return res.status(500).json({message: e});
    }
    console.log(8)

   


    return res.status(200).json({message: 'تم تحميل الصورة بنجاح.'});
};


// طلب بيانات الصور كلها
exports.allPhotos = async(req,res)=>{
    const id = req.query.id
    try{
    const allPhotos = await Photos.find();
    if(!allPhotos) return
    const likedPhoto = await Likes.find().where('user').equals(id).exec()    
    res.status(200).json({imageInfo: allPhotos, liked: likedPhoto});
    }catch(e){
        return res.status(500).json({massage:"!حدثت مشكلة في التحميل"}) 
    }

    
}


// طلب صور المستخدم
exports.myPhotos = async(req,res)=>{
    try{
    const allPhotos = await Photos.find().where('user').equals(req.userId).exec();
    const likedPhoto = await Likes.find().select('-_id').where('user').equals(req.userId).exec()
    res.status(200).json({imageInfo: allPhotos, liked: likedPhoto});
    }catch(e){
        return res.status(500).json({massage:"!حدثت مشكلة في التحميل"}) 
    }

    
}

// حذف الصوره
exports.delete = async(req,res)=>{
    const {imageId} = req.query
    const image = await Photos.findById(imageId)
    console.log(imageId)
    console.log(image)
    console.log(image.public_id)
    if(req.userId == image?.user){
        try {
            await cloudinary.uploader.destroy(image.public_id);
        } catch (err) {
        console.log(err)
        return res.status(500).json({massage: `حدثت مشكلة أثناء عملية الحذف`})
        }
        //   حذف بيانات الصورة
        await image.deleteOne()
        // حذف اللايكات المرتبطة بالصورة
        const like = await Likes.find().where('photo').equals(imageId).exec()
        if(like.length !=0) await Likes.deleteMany({photo: imageId})
        return res.status(200).json({massage: true})
        
    }
    return res.status(401).json({massage: "يجب أن تكون أنت مرسل الصوره لكي تحذفها"})

}


// التعديل على عنوان ووصف الصورة
exports.modify = async (req,res)=>{
    const {title , description, imageId } = req.body
    // الأخطاء المتوقعة
    if(title.length > 16) return res.status(401).json({massage:`أحرف العنوان يجب أن  لا تتجاوز 15 حرف عدد الاحرف المكتوبة ${title.length} `});
    if(description.length > 81) return res.status(401).json({massage:`أحرف الوصف يجب أن  لا تتجاوز 80 حرف عدد الاحرف المكتوبة ${description.length} `});

    try{
    const image = await Photos.findById(imageId)
    //  التأكد من المستخدم وحفظ البيانات
    if(req.userId == image?.user){
        image.title = title
        image.description = description
        image.save()
        return res.status(200).json({massage: true})
    }
    return res.status(401).json({massage: "يجب أن تكون أنت من أرسل الصوره لكي تستطيع التعديل عليها"})

}catch(e){
    return res.status(500).json({massage: "!!حدث خطأ"})
}
}

// اللايكات
exports.like = async (req, res)=>{
    const {imageId} = req.body
    // التأكد من تواجد لايك مرتبط بالصورة و المستخدم
    try{
    const liked = await Likes.findOne()
    .where('user').equals(req.userId)
    .where('photo').equals(imageId)
    .exec()
    let likeCounter = await Photos.findById(imageId)
    // حذف اللايك
    if(liked) {
        await liked.deleteOne();

        try{
            likeCounter.likes =  parseInt(likeCounter.likes) - 1

            await likeCounter.save()
        }catch(e){
            return res.status(500).json({massage:'1' + e});
        }


        return res.status(200).json({massage:true , likeSituation: 'unlike'});
    }
    // أضافة لايك
    else{
    const liking = await Likes({
        user: req.userId,
        photo: imageId
    })
    liking.save()

    try{
        likeCounter.likes =  parseInt(likeCounter.likes) + 1
        await likeCounter.save()
    }catch(e){
        return res.status(500).json({massage:'2' + e});
    }


    return res.status(200).json({massage:true  , likeSituation: 'like'});

    }
    }catch(e){
        return res.status(500).json({massage:'3' + e});
    }

    

}


