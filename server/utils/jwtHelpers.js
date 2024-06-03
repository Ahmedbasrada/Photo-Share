const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET


//  أرسال jwt

exports.sign = (payload) => {
    
    return jwt.sign(payload, secret )
}


const verify = (token) =>{
    try{
        return jwt.verify(token, secret)

    }catch(e){
       return false
    }
}



// التأكد من المستخدم بأستخدام jwt
exports.check = (req, res, next) => {
    let token = req.headers['authorization']
    // Authorization: Bearer token....
    token = token?.replace('Bearer', '')?.trim()
    const payload = verify(token)
    if (payload) {
        req.userId = payload.sub
        req.userName = payload.name
        return next()
    }
        return res.status(401).json({
            massage: 'غير مصرح بك!'
        })
}
