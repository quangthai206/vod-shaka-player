const router = require("express").Router();
const userController = require("../controller/user.controller");
const videoController = require("../controller/video.controller");
const courseController = require("../controller/course.controller");
const auth = require("../middleware/auth");
const multer = require('multer');
const upload = multer();

router.post("/user", userController.createUser);
router.post("/login", userController.login);

router.post("/courses", courseController.createCourse);
router.get("/courses", auth, courseController.getCourses);
router.get("/courses/:id", courseController.getCourseDetails);
router.post("/chapters", courseController.createChapter);
router.patch("/chapters", courseController.updateChapterTitle)
router.get("/lessons/:id", courseController.getLessonDetails)
router.post("/lessons", auth, upload.single('video'), courseController.createLesson)
router.patch("/lessons", courseController.updateLesson)
router.get("/courses/:id/playlist", courseController.getPlaylist)

router.get("/videos", auth, videoController.getVideos)

router.post("/users", userController.createUser);
router.post("/login", userController.login);
router.get("/token", auth, userController.checkToken);

module.exports = router;
