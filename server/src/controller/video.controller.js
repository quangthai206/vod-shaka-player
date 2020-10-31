
var formidable = require("formidable");
const fs = require('fs'); 
const path = require('path') 


// function up-video
// namvh
 function upLoadFile (req, res){
  

const form = new formidable.IncomingForm(); 
form.parse(req, function(err, fields, files){ 
  //  console.log(files);
    var oldPath = files.file.path; 
   // console.log(oldPath);
    var newPath = 'D:/Project/vod-shaka-player/server/uploads'   + '/'+files.file.name ;
    var rawData = fs.readFileSync(oldPath) 
  
    fs.writeFile(newPath, rawData, function(err){ 
        if(err) console.log(err) 
        return res.send("Successfully uploaded") 
    }) 
}) 
}

module.exports = {
 
  upLoadFile
}
