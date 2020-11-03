const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../model/User');

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

const checkToken = (req, res) => {
  return res.status(200).json({
    status: true,
    message: "Token hợp lệ"
  })
}
module.exports = {
  createUser,
  login,
  checkToken
}