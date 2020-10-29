module.exports = function (req, res, next) {

  try {

    if(req.user.role !== 'lecture') {
      return res.status(401).json({
        status: false,
        message: "You don't have permision to access this resource"
      })
    }

    next()
  } catch (err) {
    console.log(err);
    console.error("something wrong with auth middleware");
    res.status(500).json({
      msg: "Server Error"
    });
  }
};