const express = require('express')
var router = express.Router();
const multer = require('multer');
const { register, login, test, addPost, editPost, deletePost, viewPost } = require('../controllers/AuthController')
const { auth, checkDeletePermition, checkAddPermition, checkEditPermition, checkViewPermition } = require('../middleware/auth')
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads");
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        console.log("ext", ext);
        cb(null, `${Date.now()}.${ext}`);
    },
});
const upload = multer({
    storage: multerStorage,
});
router.post('/register', register);
router.post('/login', login);
router.get('/test', test);
router.post('/addPost', upload.single('post_image'), auth, checkAddPermition, addPost);
router.post('/editPost', upload.single('post_image'), auth, checkEditPermition, editPost);
router.post('/deletePost', upload.single('post_image'), auth, checkDeletePermition, deletePost);
router.post('/viewPost', upload.single('post_image'), auth, checkViewPermition, viewPost);

module.exports = router;