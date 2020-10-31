const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Course = require('../model/Course');
const createCourse = async(req, res) => {
  const { name,code, description, videos,lecturer,students,schemester } = req.body;

  try {
    let course = await Course.findOne({ code });
    if(course) {
      return res.status(409).json({
        status: false,
        message: "Mã môn học đã tồn tại" 
      })
    } 
    
    newCourse = new Course()
   // const salt = await bcrypt.genSalt(8);
    
    newCourse.name = name;
    newCourse.code = code;
    newCourse.description = description;
    newCourse.videos = videos;
    newCourse.lecturer = lecturer;
    newCourse.students = students;
    newCourse.schemester = schemester;
    

    newCourse.save();

    return res.status(201).json({
      status: true,
      message: "Course created"
    })

  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: false,
      message: err.message
    })
  }
}


module.exports = {
    createCourse
}