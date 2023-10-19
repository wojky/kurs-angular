module.exports = (req, res, next) => {
  if (req.method === "POST") {
    console.log(req.body);
    req.body.createdAt = Date.now();
    req.body.updatedAt = null;
  }

  if (req.method === "PATCH") {
    req.body.updatedAt = Date.now();
  }

  next();
};
