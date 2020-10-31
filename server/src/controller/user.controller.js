const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../model/User');
const Course = require('../model/Course');

const createUser = async(req, res) => {
  const { email, password, role } = req.body;

  try {
    let user = await User.findOne({ email });
    if(user) {
      return res.status(409).json({
        status: false,
        message: "Sinh viên này đã tồn tại trên hệ thống" 
      })
    } 
    
    user = new User()
    const salt = await bcrypt.genSalt(8);
    
    user.email = email;
    user.password = await bcrypt.hash(password, salt);
    
    if(role) {
      user.role = role;
    }

    user.save();

    return res.status(201).json({
      status: true,
      message: "User created"
    })

  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: false,
      message: err.message
    })
  }
}

const login = async(req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      email
    })
    
    if(!user) {
      return res.status(400).json({
        status: false,
        message: "Tài khoản hoặc mật khẩu không chính xác"
      })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
      return res.status(400).json({
        status: false,
        message: "Tài khoản hoặc mật khẩu không chính xác"
      })
    }

    const payload = {
      id: user._id,
      email,
      role: user.role
    }

    jwt.sign(
      payload,
      process.env.JWT_SECRET, {
        expiresIn: "5 days"
      },
      (err, token) => {
        if(err) throw err;
        res.status(200).json({
          status: true,
          message: "Đăng nhập thành công",
          data: {
            token,
            user: payload
          }
        })
      }
    )
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: false,
      message: err.message
    })
  }
}

const checkToken = () => {
  
}

const addStudentToCourse = async(req, res) => {
  const {user_id, course_id   } = req.query;
  try {
    let user = await User.findOne({ _id:user_id });
    let course = await Course.findOne({ _id:course_id });
    if(course && user ) {
        var arrayStudent = course.students;
        if(arrayStudent.find(item => item == user._id.toString())) {
          return res.status(409).json({
            status: false,
            message: `Sinh viên này đã tham gia khóa học!`,
          })
        } else {
          arrayStudent.push(user._id);
          var newCourse = {
            description: course.description,
            name: course.name,
            videos: course.videos,
            lecturer: course.lecturer,
            students: arrayStudent,
            schemester: course.schemester,
          }
          Course.updateOne({ _id:course_id }, newCourse)
            .then( () =>  res.status(200).json({status:true, message:`Thêm sinh viên thành công`}))
            .catch(() => res.status(400).json({message : 'Thêm thất bại!'}))
        }
    } else {
      return res.status(500).json({
        status: false,
        message: "Sinh viên hoặc khóa học không tồn tại!",
      })
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: false,
      message: err.message
    })
  }
}

const deleteStudentInCourse = async(req,res) => {
  const {user_id, course_id   } = req.query;
  try {
    let user = await User.findOne({ _id:user_id });
    let course = await Course.findOne({ _id:course_id });
    if(course && user ) {
        var arrayStudent = course.students;
        if(arrayStudent.find(item => item == user._id.toString())) {
          var newCourse = {
            description: course.description,
            name: course.name,
            videos: course.videos,
            lecturer: course.lecturer,
            students: arrayStudent.filter(item => item == user._id),
            schemester: course.schemester,
          }
          Course.updateOne({ _id:course_id }, newCourse)
            .then( () =>  res.status(200).json({status:true, message:`Xóa sinh viên thành công`}))
            .catch(() => res.status(400).json({message : 'Xóa sinh viên thất bại!'}))
        }  else {
          return res.status(200).json({
            status: false,
            message: `Sinh viên này chưa tham gia khóa học!`,
          }) 
        } 

    } else {
      return res.status(500).json({
        status: false,
        message: "Sinh viên hoặc khóa học không tồn tại!",
      })
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: false,
      message: err.message
    })
  }
}
module.exports = {
  createUser,
  login,
  checkToken,
  addStudentToCourse,
  deleteStudentInCourse
}
