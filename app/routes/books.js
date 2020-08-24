import books from "../controllers/BookController.js";
import multer from "multer";
import { Router } from "express";

export default (app) => {
  const router = Router();
  const book = books;

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

  router.get("/", book.findAll);
  router.post("/", upload.single("cover"), book.create);
  router.get("/:id", book.findOne);
  router.put("/:id", upload.single("cover"), book.update);
  router.delete("/:id", book.delete);

  app.use("/api/books", router);
};
