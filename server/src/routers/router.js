const router = require("express").Router();
var express = require('express');
const path = require('path');
var app = express()
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
const userController = require('../controller/user.controller');
const videoController = require('../controller/video.controller');
const courseController = require('../controller/course.controller');
router.post('/user', userController.createUser)
router.post("/login", userController.login)
/*router.post("/upfile", upload.single('avatar'), function (req, res)  {
  console.log(req.body.name)
  console.log(req.file)    
  console.log("Say Hi!!!");
      console.log('req.file', req.file);
     
});*/
router.post('/video/create', videoController.upLoadFile);
router.post('/course/create', courseController.createCourse);

  //   app.post('/upload-profile-pic', (req, res) => {
  //     console.log("Say Hi!!!");
  //     // 'profile_pic' is the name of our file input field in the HTML form
  //     let upload = multer({ storage: storage, fileFilter: helpers.imageFilter }).single('profile_pic');
  
  //     upload(req, res, function(err) {
  //         // req.file contains information of uploaded file
  //         // req.body contains information of text fields, if there were any
  
  //         if (req.fileValidationError) {
  //             return res.send(req.fileValidationError);
  //         }
  //         else if (!req.file) {
  //             return res.send('Please select an image to upload');
  //         }
  //         else if (err instanceof multer.MulterError) {
  //             return res.send(err);
  //         }
  //         else if (err) {
  //             return res.send(err);
  //         }
  
  //         // Display uploaded image for user validation
  //         res.send(`You have uploaded this image: <hr/><img src="${req.file.path}" width="500"><hr /><a href="./">Upload another image</a>`);
  //     });
  // });


const userController = require('../controller/user.controller');
const videoController = require('../controller/video.controller')
const auth = require('../middleware/auth');
const isLecture = require("../middleware/checkIsLecture");

router.post('/user', userController.createUser);
router.post('/login', userController.login);
router.get('/token', auth, userController.checkToken)

// test check is lecture
router.get('/test', auth, isLecture, videoController.createFile)


module.exports = router;