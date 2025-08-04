exports.handlePathNotFound = (req, res, next) => {
  //   console.log(req.params);
  res.status(404).send({ msg: "Path not found" });
};

exports.handleBadRequests = (err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Bad Request" });
  } else {
    next(err);
  }
};
exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};
