var formidable = require("formidable");
const fs = require("fs");
const path = require("path");
const ffmpeg = require("fluent-ffmpeg");
const { exec } = require("child_process");
const { runInContext } = require("vm");
const Video = require("../model/Video");

// function up-video
// namvh
const upLoadVideo = (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    try {
      //  console.log(files);
      var oldPath = files.file.path;
      // console.log(oldPath);
      var newPath =
        __dirname.replace("controller", "uploads") + "/" + files.file.name;
      var outputPath = __dirname.replace("controller", "uploads") + "/dt";

      var fileManifest =
        __dirname.replace("controller", "public/file/") + files.file.name;

      var rawData = fs.readFileSync(oldPath);

      fs.writeFileSync(newPath, rawData);
      console.log("oke");
      exec(
        `ffmpeg -y -i ${newPath} -c:a aac -ac 2 -ab 256k -ar 48000 -c:v libx264 -x264opts ‘keyint=24:min-keyint=24:no-scenecut’ -b:v 1500k -maxrate 1500k -bufsize 1000k -vf “scale=-1:720” ${outputPath}op720${files.file.name}`,
        (err) => console.log(err)
      );
      exec(
        `ffmpeg -y -i ${newPath} -c:a aac -ac 2 -ab 128k -ar 44100 -c:v libx264 -x264opts ‘keyint=24:min-keyint=24:no-scenecut’ -b:v 800k -maxrate 800k -bufsize 500k -vf “scale=-1:540” ${outputPath}op540${files.file.name}`,
        (err) => console.log(err)
      );
      exec(
        `ffmpeg -y -i ${newPath} -c:a aac -ac 2 -ab 64k -ar 22050 -c:v libx264 -x264opts ‘keyint=24:min-keyint=24:no-scenecut’ -b:v 400k -maxrate 400k -bufsize 400k -vf “scale=-1:360” ${outputPath}op320${files.file.name}`,
        (err) => console.log(err)
      );

      // let video = await Video.findOne({ name: files.file.name });

      // if (video) {
      //   return res.status(409).json({
      //     status: false,
      //     message: "file already exist.",
      //   });
      // }

      // video = new Video();
      // video.name = files.file.name;
      // video.fileLink = fileManifest;
      // video.save();
    } catch (err) {
      console.log(err);
    }
  });
};

const getFileManifest = async (req, res) => {
  const { videoName } = req.body;

  try {
    const video = await Video.findOne({ name: videoName });

    if (!video) {
      return res.status(400).json({
        status: false,
        message: "file not exist",
      });
    }

    return res.status(200).json({
      status: true,
      message: "success",
      data: video.fileLink,
    });
  } catch (err) {
    console.log(err);
  }
};

const createVideo = async (req, res) => {

  const { name, fileLink } = req.body;
  const video = Video({
    name, 
    fileLink
  })

  await video.save()

  return res.status(201).json({
    data: video
  })

}

module.exports = {
  upLoadVideo,
  getFileManifest,
  createVideo
};
