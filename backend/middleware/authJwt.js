import jwt from "jsonwebtoken";
import config from "../config/auth.config.js";

const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.send({
      tokenMessage: "No token provided!",
    });
  }
  console.log(token);

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.send({
        tokenMessage: "Unauthorized!",
      });
    }
    req.body.login = decoded.login;
    next();
  });
};

const authJwt = {
    verifyToken: verifyToken,
  };

  export default authJwt