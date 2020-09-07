import user from "../controllers/UserController";
import { Router } from "express";
import multer from "multer";
import authJwt from "../middleware/authJwt";
// import Role from "../middleware/Role";

export default (app) => {
  const router = Router();

  const imageFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb("Please upload only images", false);
    }
  };

  var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./uploads/images/users");
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

  var upload = multer({
    storage: storage,
    fileFilter: imageFilter,
    limits: { fileSize: 1024 * 1024 * 10 },
  });

  router.post("/", upload.single("avatar"), user.create);
  router.post("/login", user.login);

  router.get("/", authJwt.verifyToken, user.findAll);

  app.use("/api/users", router);
};
