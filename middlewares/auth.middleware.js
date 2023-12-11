const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  let token = req.headers?.authorization?.split(" ")[1];
  if (token) {
    jwt.varify(token, "masai", (err, decoded) => {
      if (decoded) {
        req.body.userID = decoded.userID;
        req.body.name = decoded.name;
        next();
      } else {
        res.send({ msg: "Please login first" });
      }
    });
  } else {
    res.send({ msg: "Please login first you are not a person in my DataBase" });
  }
};
