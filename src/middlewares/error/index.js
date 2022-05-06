const { INTERNAL_SERVER_ERROR } = require("http-status-codes").StatusCodes;

module.exports = (err, _req, res, _next) => {
  if (err && err.status) {
    // uncomment the next line to see the error in the console
    // console.log(err);
    return res.status(err.status).json({ message: err.message });
  }
  return res.status(INTERNAL_SERVER_ERROR).end();
};