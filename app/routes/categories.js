import categories from "../controllers/CategoriesController";
import multer from "multer";
import { Router } from "express";

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
      cb(null, "./uploads/images/books");
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

  router.get("/", categories.findAll);
  router.get("/:id", categories.findOne);
  router.post("/", upload.single("image"), categories.create);
  router.put("/:id", upload.single("image"), categories.update);
  router.delete("/:id", categories.delete);

  app.use("/api/categories", router);
};
