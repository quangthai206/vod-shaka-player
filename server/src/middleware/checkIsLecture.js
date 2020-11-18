module.exports = function (req, res, next) {
  if (req.user.role !== "lecture") {
    return res.status(401).json({
      status: false,
      message: "You don't have permision to access this resource",
    });
  }

  next();
};
