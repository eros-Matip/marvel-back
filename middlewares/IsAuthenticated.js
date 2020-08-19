const { findOne } = require("../model/Icon");

const isAuthenticated = async (req, res, next) => {
  if (req.headers.authorization) {
    const user = await findOne({
      token: req.headers.authorization.replace("Bearer", " "),
    });

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    } else {
      req.user = user;
      return next;
    }
  } else {
    return res.status(400).json({ error: "UnAuthorized" });
  }
};

module.export = isAuthenticated;
