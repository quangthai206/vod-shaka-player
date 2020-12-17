const Video = require("../model/Video");

const getVideos = async (req, res) => {
  try {
    const videos = await Video.find({ author: req.get('uid') })
    return res.status(200).json({
      status: true,
      message: "success",
      data: videos
    })
  } catch (err) {
    console.log(err.message)
    return res.status(500).json({
      status: false,
      message: err.message
    })
  }
}

module.exports = {
  getVideos
};
