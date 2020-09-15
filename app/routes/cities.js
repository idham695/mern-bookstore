import cities from "../controllers/CityController";
import { Router } from "express";

export default (app) => {
  const router = Router();

  router.get("/", cities.findAll);

  app.use("/api/cities", router);
};
