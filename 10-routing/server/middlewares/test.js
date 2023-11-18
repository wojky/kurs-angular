module.exports = (req, res, next) => {
  console.log(req.method, req.url);
  if (req.method === "POST") {
    req.body.createdAt = Date.now();
    req.body.updatedAt = null;
  }

  if (req.method === "PATCH") {
    req.body.updatedAt = Date.now();
  }

  if (req.url === "/tasks" && req.method === "POST") {
    req.body.done = false;
    req.body.projectId = null;
  }

  next();
};
