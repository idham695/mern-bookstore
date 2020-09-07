import jwt, { decode } from "jsonwebtoken";
import config from "../config/auth";

const verifyToken = (req, res, next) => {
  let token = req.headers["x-auth-token"];

  if (!token) {
    return res.status(403).send({
      message: "tidak di izinkan",
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "tidak terautorisasi",
      });
    }

    (req.userId = decoded.id), (req.role = decoded.role);
    next();
  });
};

const isAdmin = (role) => (req, res, next) => {
  if (req.role != role) {
    return res.status(403).send({
      message: "tidak di izinkan selain akun admin",
    });
  }
  next();
};

const authJwt = {
  isAdmin,
  verifyToken,
};

export default authJwt;
