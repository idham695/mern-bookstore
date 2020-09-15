import provinces from "../controllers/ProvinceController";
import { Router } from "express";

export default (app) => {
  const router = Router();

  router.get("/", provinces.findAll);

  app.use("/api/provinces", router);
};
