const Chapter = require("../model/Chapter");
const Course = require("../model/Course");
const Lesson = require("../model/Lesson");
const Video = require("../model/Video");
const User = require("../model/User")
const fs = require('fs');
const path = require('path');
const utils = require('../utils/Utils');
const Swatch = require('../utils/swatch');

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

    const chapter = new Chapter({
      title,
      course: courseId
    });
    await chapter.save()

    course.chapters.push(chapter._id);
    await course.save()

    return res.status(201).json({
      status: true,
      message: "chapter created",
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
      const newVideo = new Video({
        name: fileName,
        author: req.user.id,
        fileLink: `http://apig9.toedu.me/${fileName}.mpd`,
        poster: `http://apig9.toedu.me/${fileName}_poster.png`
      });

      fs.writeFileSync(resultLocation, req.file.buffer);
      console.log('write file completed');

      await utils.execShellCommand(`ffmpeg -i ${resultLocation} -ss 00:00:01.000 -vframes 1 ${path.join(location, fileName + '_poster.png')}`)
      Swatch.load(path.join(location, fileName + '_poster.png'))
        .then(pixels => Swatch.quantize(pixels))
        .then(buckets => Swatch.orderByLuminance(buckets))
        .then(swatch => {
          const primary = Swatch.getMostVariantColor(swatch);
          console.log(primary);
          const colors = {
            primary,
            secondary: Swatch.darken(primary, 25),
            tertiary: Swatch.darken(primary, 50),
            quaternary: Swatch.darken(primary, 75),
            primaryLight: Swatch.lighten(primary, 100)
          };

          newVideo.colors = colors;

          console.log(JSON.stringify(colors, null, 2));

        });

      const duration = await utils.execShellCommand(`ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 ${resultLocation}`)
      newVideo.duration = Math.round(duration);

      const p1 = utils.execShellCommand(`ffmpeg -y -i ${resultLocation} -c:a aac -ac 2 -ab 256k -ar 48000 -c:v libx264 -x264opts 'keyint=24:min-keyint=24:no-scenecut' -b:v 1500k -maxrate 1500k -bufsize 1000k -vf "scale=-1:720" ${path.join(location, fileName + '_720.mp4')}`);
      const p2 = utils.execShellCommand(`ffmpeg -y -i ${resultLocation} -c:a aac -ac 2 -ab 128k -ar 44100 -c:v libx264 -x264opts 'keyint=24:min-keyint=24:no-scenecut' -b:v 800k -maxrate 800k -bufsize 500k -vf "scale=-1:540" ${path.join(location, fileName + '_540.mp4')}`);
      const p3 = utils.execShellCommand(`ffmpeg -y -i ${resultLocation} -c:a aac -ac 2 -ab 64k -ar 22050 -c:v libx264 -x264opts 'keyint=24:min-keyint=24:no-scenecut' -b:v 400k -maxrate 400k -bufsize 400k -vf "scale=-1:360" ${path.join(location, fileName + '_360.mp4')}`);

      await Promise.all([p1, p2, p3]);

      console.log('transcoding completed');

      await utils.execShellCommand(`packager \
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

      await newVideo.save();

      newLesson.video = newVideo._id;
      await newLesson.save();

      console.log('video created');
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
    const course = await Course.findOne({ _id: req.params.id }).populate({ path: "chapters", populate: { path: "lessons" } }).populate('teacher');

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
    const lesson = await Lesson.findOne({ _id: req.params.id }).populate({ path: "chapter", select: { 'course': 1 }, populate: { path: "course", select: { 'name': 1 } } }).populate({ path: "video", select: { 'fileLink': 1, 'poster': 1, 'colors': 1 } });

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

const getPlaylist = async (req, res) => {
  try {
    const courseDetails = await Course.findOne({ _id: req.params.id }).populate({ path: "chapters", populate: { path: "lessons", populate: { path: "video", select: { 'duration': 1 } } } });
    res.json({
      courseId: courseDetails._id,
      courseTitle: courseDetails.name,
      chapters: courseDetails.chapters
    })
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
  getLessonDetails,
  getPlaylist
};
