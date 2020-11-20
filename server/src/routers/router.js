const router = require("express").Router();
const userController = require("../controller/user.controller");
const videoController = require("../controller/video.controller");
const courseController = require("../controller/course.controller");
const auth = require("../middleware/auth");

router.post("/user", userController.createUser);
router.post("/login", userController.login);
router.post("/video/create", videoController.upLoadVideo);
router.post("/course/create", courseController.createCourse);
router.get("/courses", courseController.getCourses);
router.get("/video/file", videoController.getFileManifest);

router.post("/user", userController.createUser);
router.post("/login", userController.login);
router.get("/token", auth, userController.checkToken);

module.exports = router;
