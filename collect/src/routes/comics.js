const { Router } = require('express');
const router = Router();
const comicCtrl = require('../controllers/comic.controller');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/');
    },
    filename: function(req, file, cb){
        const name = new Date().toISOString().replace(":", "-").replace(".","-").replace(":", "-");
        cb(null, name + ".jpg");
    }
});
const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg'){
        cb(null, true);
    }else{
        cb(null, false);
    }
};
const upload = multer({
    storage: storage, 
    limits: {
        fileSize: 1024 * 1024 * 5 
    },
    fileFilter: fileFilter
});

router.route('/search')
    .post(comicCtrl.searchComic);

router.route('/')
    .post(upload.single('coverfile'), comicCtrl.postComic);

router.route('/alltitle')
    .get(comicCtrl.getAllTitle);

router.route('/addtomycomics')
    .post(comicCtrl.addComic);
    
module.exports = router;