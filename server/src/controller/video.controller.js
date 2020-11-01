
var formidable = require("formidable");
const fs = require('fs'); 
const path = require('path') 
const Video = require('../model/Video');

// function up-video
// namvh
 function upLoadFile (req, res){
  

const form = new formidable.IncomingForm(); 



form.parse(req, function(err, fields, files){ 
    var video = new Video();
   
    var nameVideo = fields.name;
     console.log(files);
     console.log(err);
     console.log(fields);
    if(nameVideo != null || nameVideo != undefined){
      video.name = nameVideo;
      console.log(video.name);
    }
    var oldPath = files.file.path; 
   // console.log(oldPath);
    var newPath = 'D:/Project/vod-shaka-player/server/uploads'   + '/'+files.file.name ;
    var rawData = fs.readFileSync(oldPath) 
    
    fs.writeFile(newPath, rawData, function(err){ 
        if(err) console.log(err) 
        return res.send("Successfully uploaded") 
    }) 
    video.fileLink = newPath;
    video.save();
}) 
}

module.exports = {
 
  upLoadFile
}
