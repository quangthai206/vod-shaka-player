const router = require("express").Router();
const userController = require("../controller/user.controller");
const videoController = require("../controller/video.controller");
const courseController = require("../controller/course.controller");
const auth = require("../middleware/auth");

router.post("/user", userController.createUser);
router.post("/login", userController.login);
router.post("/videos", videoController.createVideo);

router.post("/courses", courseController.createCourse);
router.get("/courses", auth, courseController.getCourses);
router.get("/courses/:id", courseController.getCourseDetails);
router.post("/chapters", courseController.createChapter);
router.patch("/chapters", courseController.updateChapterTitle)
router.post("/lessons", courseController.createLesson)
router.patch("/lessons", courseController.updateLesson)
router.get("/video/file", videoController.getFileManifest);

router.post("/users", userController.createUser);
router.post("/login", userController.login);
router.get("/token", auth, userController.checkToken);

module.exports = router;
