const jwtHelpers = require('../utils/jwtHelpers')
const Likes = require('../module/likes')
const Photos = require('../module/photos')
const path = require("path")
const fs = require("fs")



// رفع الصور 
exports.upload = async (req, res)=>{
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({massage:'لم يتم تحميل أي صورة.'});
    }

    // استقبال الصورة من الطلب
    const image = req.files.image;
    
    const {title, description} = req.body
    // الأخطاء المتوقعة
    if(!title || !description) return res.status(401).json({massage: "يرجى أضافة عنوان و وصف للصورة"});
    if(title.length > 16) return res.status(401).json({massage:`أحرف العنوان يجب أن  لا تتجاوز 15 حرف عدد الاحرف المكتوبة ${title.length} `});
    if(description.length > 81) return res.status(401).json({massage:`أحرف الوصف يجب أن  لا تتجاوز 80 حرف عدد الاحرف المكتوبة ${description.length} `});

    let extname , photo;
    extname = path.extname(image.name)

    if (extname != '.jpeg' && extname != '.png' ){
            return res.status(415).json(
                {massage: `لا تقبل إلا ملفات من صيغة .png و .jpeg صيغة الملف المرسل هوا ${extname}`}
                );
        }
    // حفظ بيانات الصوره
    try{
     photo = await Photos({
        title: title,
        description: description,
        user: req.userId
    })
    await photo.save()
    }catch(e){
        res.status(500).json({massage: e})
    }

    
    const uploadPath = path.join(__dirname, '..', 'photosStore');
    // حفظ الصورة في المسار المحدد على الخادم
    image.mv(path.join(uploadPath, photo.id + extname), (err) => {
        if (err) {
            return res.status(500).json(
                {massage:err}
                );
        }

        res.status(200).json({massage:'تم تحميل الصورة بنجاح.'});
    });

}


// طلب بيانات الصور كلها
exports.allPhotos = async(req,res)=>{
    const id = req.query.id
    try{
    const allPhotos = await Photos.find();
    const likedPhoto = await Likes.find().where('user').equals(id).exec()
    const imagePath = path.join(__dirname, '..','photosStore'); 
    const imageFiles = fs.readdirSync(imagePath);
    const imagePreviews = [];
    if (imageFiles){
    // قراءة محتوى كل ملف صورة وتحويله إلى base64
    imageFiles.forEach(file => {
        const filePath = path.join(imagePath, file);
        const imageContent = fs.readFileSync(filePath, { encoding: 'base64' });

        // إضافة عرض الصور للقائمة
        imagePreviews.push({
            name: file,
            data: imageContent
        });
    });
}
    res.status(200).json({imageInfo: allPhotos, liked: likedPhoto, imagePreviews: imagePreviews});
    }catch(e){
        return res.status(500).json({massage:"!حدثت مشكلة في التحميل"}) 
    }

    
}


// طلب صور المستخدم
exports.myPhotos = async(req,res)=>{
    try{
    const allPhotos = await Photos.find().where('user').equals(req.userId).exec();
    const likedPhoto = await Likes.find().select('-_id').where('user').equals(req.userId).exec()
    const imagePath = path.join(__dirname, '..','photosStore'); 
    const imageFiles = fs.readdirSync(imagePath);
    const imagePreviews = [];
    
    // قراءة محتوى كل ملف صورة وتحويله إلى base64
    imageFiles.forEach(file => {
        const filePath = path.join(imagePath, file);
        const imageContent = fs.readFileSync(filePath, { encoding: 'base64' });

        // إضافة عرض الصور للقائمة
        imagePreviews.push({
            name: file,
            data: imageContent
        });
    });
    res.status(200).json({imageInfo: allPhotos, liked: likedPhoto, imagePreviews: imagePreviews});
    }catch(e){
        return res.status(500).json({massage:"!حدثت مشكلة في التحميل"}) 
    }

    
}

// حذف الصوره
exports.delete = async(req,res)=>{
    const {imageId, imageName } = req.query
    const image = await Photos.findById(imageId)
    if(req.userId == image?.user){
        const uploadPath = path.join(__dirname, '..', 'photosStore');
        // حذف الصوره من الخادم
         fs.unlink(path.join(uploadPath, imageName), (err) => {
            if (err) {
                return res.status(500).json({massage: err})
            }
          });
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


