const Chapter = require("../model/Chapter");
const Course = require("../model/Course");
const User = require("../model/User")

const createCourse = async (req, res) => {
  const { name, code, description } = req.body;

  try {
    let course = await Course.findOne({ code });
    if (course) {
      return res.status(409).json({
        status: false,
        message: "Môn học đã tồn tại",
      });
    }

    newCourse = new Course();
    newCourse.name = name;
    newCourse.code = code;
    newCourse.description = description;

    await newCourse.save();

    return res.status(201).json({
      status: true,
      message: "Course created",
      data: newCourse
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

const createChapter = async (req, res) => {
  const { courseId, title } = req.body;

  try {
    const course = await Course.findOne({ _id: courseId});

    if (!course) {
      return res.status(404).json({
        status: false,
        message: "This course do not exist"
      })    
    }
  
    
    const chapter = new Chapter();
  
    chapter.title = title;
    await chapter.save()
    course.chapters.unshift(chapter._id);
  
    await course.save()
  
    return res.status(201).json({
      status: true,
      message: "chapter created",
      data: course.populate('chapter')
    })
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
}

const updateChapterTitle = async(req, res) => {
  const { chapterId, title } = req.body;

  try {
    const chapter = await Chapter.findOne({ _id: chapterId })

  if (!chapter) {
    return res.status(404).json({
      status: false,
      message: "This chapter do not exist"
    })
  }

  chapter.title = title;
  await chapter.save();
  return res.status(201).json({
    status: true,
    message: "chapter title updated",
    data: chapter
  })
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
}

const createLesson = async(req, res) => {
  const { chapterId, title, description, videoId } = req.body;

  try {
    const chapter = await Chapter.findOne({ _id: chapterId })

  if (!chapter) {
    return res.status(404).json({
      status: false,
      message: "This chapter do not exist"
    })
  }

  chapter.lessons = [
    {
      title,
      description,
      video: videoId
    }
  ]

  await chapter.save()

  return res.status(201).json({
    status: true,
    message: "lesson created",
    data: chapter
  })
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
}

const updateLesson = async(req, res) => {
  const { chapterId, lessonId, title, description } = req.body;

  try {
    const chapter = await Chapter.findOne({ _id: chapterId })

    if (!chapter) {
      return res.status(404).json({
        status: false,
        message: "This chapter do not exist"
      })
    }

    for (let item of chapter.lessons) {
      if( item._id.toString() === lessonId) {
        item.title = title
        item.description = description
        break;
      }
    }

    await chapter.save()

    res.status(201).json({
      status: true,
      message: "chapter updated",
      data: chapter
    })
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
}


const getCourses = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id}).populate({ path : 'courses', populate: { path: 'teacher', select: 'name'}})
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "This user do not exist"
      })
    }

    return res.status(200).json({
      status: true,
      message: "success",
      data: user.courses,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

module.exports = {
  createCourse,
  getCourses,
  createChapter,
  updateChapterTitle,
  createLesson,
  updateLesson
};
