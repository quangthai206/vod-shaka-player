const Chapter = require("../model/Chapter");
const Course = require("../model/Course");
const Lesson = require("../model/Lesson");
const User = require("../model/User")
const fs = require('fs');
const path = require('path');

/**
 * Executes a shell command and return it as a Promise.
 * @param cmd {string}
 * @return {Promise<string>}
 */
function execShellCommand(cmd) {
  const exec = require('child_process').exec;
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.warn(error);
      }
      resolve(stdout ? stdout : stderr);
    });
  });
}

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

    const newCourse = new Course();
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
    const course = await Course.findOne({ _id: courseId });

    if (!course) {
      return res.status(404).json({
        status: false,
        message: "This course do not exist"
      })
    }


    const chapter = new Chapter();

    chapter.title = title;
    await chapter.save()
    course.chapters.push(chapter._id);

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

const updateChapterTitle = async (req, res) => {
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

const createLesson = async (req, res) => {
  const { chapterId, title, description, videoId } = req.body;

  try {
    const chapter = await Chapter.findOne({ _id: chapterId })

    const newLesson = new Lesson({
      title,
      description,
      chapter: chapterId
    });

    // In case teacher chooses an available video
    if (videoId) {
      newLesson.video = videoId;
    }

    await newLesson.save();

    chapter.lessons.push(newLesson._id);
    await chapter.save();

    res.json({
      status: true,
      message: "create lesson successfully",
      data: newLesson
    });

    // In case teacher upload new video
    if (!videoId) {
      const fileName = title.trim().toLowerCase().replace(/ /g, '-') + '_' + Date.now();
      const location = __dirname.replace('controller', 'public');
      const resultLocation = path.join(location, fileName + '.mp4');
      fs.writeFileSync(resultLocation, req.file.buffer);
      console.log('write file completed');

      const p1 = execShellCommand(`ffmpeg -y -i ${resultLocation} -c:a aac -ac 2 -ab 256k -ar 48000 -c:v libx264 -x264opts 'keyint=24:min-keyint=24:no-scenecut' -b:v 1500k -maxrate 1500k -bufsize 1000k -vf "scale=-1:720" ${path.join(location, fileName + '_720.mp4')}`);
      const p2 = execShellCommand(`ffmpeg -y -i ${resultLocation} -c:a aac -ac 2 -ab 128k -ar 44100 -c:v libx264 -x264opts 'keyint=24:min-keyint=24:no-scenecut' -b:v 800k -maxrate 800k -bufsize 500k -vf "scale=-1:540" ${path.join(location, fileName + '_540.mp4')}`);
      const p3 = execShellCommand(`ffmpeg -y -i ${resultLocation} -c:a aac -ac 2 -ab 64k -ar 22050 -c:v libx264 -x264opts 'keyint=24:min-keyint=24:no-scenecut' -b:v 400k -maxrate 400k -bufsize 400k -vf "scale=-1:360" ${path.join(location, fileName + '_360.mp4')}`);

      await Promise.all([p1, p2, p3]);

      console.log('transcoding completed');

      await execShellCommand(`packager \
      input=${path.join(location, fileName + '_720.mp4')},stream=audio,output=${path.join(location, fileName + '_720_audio.mp4')} \
      input=${path.join(location, fileName + '_720.mp4')},stream=video,output=${path.join(location, fileName + '_720_video.mp4')} \
      input=${path.join(location, fileName + '_540.mp4')},stream=audio,output=${path.join(location, fileName + '_540_audio.mp4')} \
      input=${path.join(location, fileName + '_540.mp4')},stream=video,output=${path.join(location, fileName + '_540_video.mp4')} \
      input=${path.join(location, fileName + '_360.mp4')},stream=audio,output=${path.join(location, fileName + '_360_audio.mp4')} \
      input=${path.join(location, fileName + '_360.mp4')},stream=video,output=${path.join(location, fileName + '_360_video.mp4')} \
      --profile on-demand \
      --mpd_output ${path.join(location, fileName + '.mpd')} \
      --min_buffer_time 3 \
      --segment_duration 3`)

      console.log('generate manifest completed');
    }

  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
}

const updateLesson = async (req, res) => {
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
      if (item._id.toString() === lessonId) {
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
    const user = await User.findOne({ _id: req.user.id }).populate({ path: 'courses', populate: { path: 'teacher', select: 'name' } })
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

const getCourseDetails = async (req, res) => {
  try {
    const course = await Course.findOne({ _id: req.params.id }).populate({ path: "chapters", populate: { path: "lessons" } });

    if (!course) {
      return res.status(404).json({
        status: false,
        message: "This course do not exist"
      })
    }

    return res.json({
      status: true,
      message: "success",
      data: course,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
}

const getLessonDetails = async (req, res) => {
  try {
    const lesson = await Lesson.findOne({ _id: req.params.id }).populate({ path: "chapter", select: { 'course': 1 }, populate: { path: "course", select: { 'name': 1 } } });

    if (!lesson) {
      return res.status(404).json({
        status: false,
        message: "This lesson do not exist"
      })
    }

    return res.json({
      status: true,
      message: "success",
      data: lesson,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
}

module.exports = {
  createCourse,
  getCourses,
  createChapter,
  updateChapterTitle,
  createLesson,
  updateLesson,
  getCourseDetails,
  getLessonDetails
};
