const jwtHelpers = require('../utils/jwtHelpers')
const Users = require('../module/users')
const bcrypt = require('bcrypt')

// تسجيل حساب جديد
exports.register =  async (req, res)=>{
    const {name, email, password, cnofigPassword}= req.body
    // التأكد من الأخطاء المتوقعة
    if(!name || !email || !password || !cnofigPassword){
        res.status(401).json({
            massage: 'عليك ملئ جميع الفراغات'
        })
        return
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailPattern.test(email)){
        return res.status(401).json({
            massage: 'البريد الإلكتروني غير صحيح'
        })
    }
    if(password == cnofigPassword){
        const emailIn = await Users.findOne({email})
        if(emailIn) {
            res.status(401).json({
                massage: 'البريد الإلكتروني مستخدم بالفعل'
            })
            return
        }

        // التشفير و حفظ البيانات
        const user =  Users({
            name,
            email,
            password: bcrypt.hashSync(password, 8)
        })
    
        try {
            await user.save()
            res.status(200).json({
                massage: true,          
                accessToken: jwtHelpers.sign({sub: user.id , name: user.name}),
                name: user.name,
                id: user.id,
            })
        }catch(e){
            res.status(500).json({
                massage: 'Something went wrong!'
            })
        }
    }
    else{
    res.status(401).json({
        massage: 'كلمة المرور غير متطابقة'
    })
}
   
   
}


// تسجيل الدخول
exports.login = async (req, res) =>{
    console.log('haaaaaaaaaaaaaaaaaaaaa')
    const {email, password} = req.body
    // التأكد من الأخطاء المتوقعة
    if( !email || !password){
        res.status(401).json({
            massage: 'عليك ملئ جميع الفراغات'
        })
        return
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailPattern.test(email)){
        return res.status(401).json({
            massage: 'البريد الإلكتروني غير صحيح'
        })
    }
    const user = await Users.findOne({email})
    // فك التشفير و المقارنة
    if(user && bcrypt.compareSync(password, user.password)){
        // نجاح العملية
        res.status(200).json({
            massage: true,          
            accessToken: jwtHelpers.sign({sub: user.id}),
            name: user.name,
            id: user.id,
        })
    }else{
        // فشل العملية
        res.status(401).json({
            massage: "كلمة المرور أو البريد الإلكتروني خاطئة"
        })
    }
}