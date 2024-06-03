var express = require('express');
var router = express.Router();
const photoController = require("./../controllers/photoController")
const utils = require('./../utils/jwtHelpers')

/* GET home page. */
// مسارات الصور

// الرفع
router.post('/upload', utils.check, photoController.upload);
// الاعحاب
router.post('/like', utils.check, photoController.like);
// طلب الصور
router.get('/allPhotos', photoController.allPhotos);
// طلب صور المستخدم
router.get('/myPhotos', utils.check, photoController.myPhotos);
// الحذف
router.delete('/delete', utils.check, photoController.delete);
// التعديل
router.put('/modify', utils.check, photoController.modify);






module.exports = router;
