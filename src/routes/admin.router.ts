import express from "express";
import {
  updateUserInfos,
  getUserInfos,
} from "../controllers/admin.controller";
import { auth } from "../middlewares/auth";
import {checkChangeInfoData,} from "../middlewares/admin.middleware";

const router = express.Router();
router.post("/updateUserInfos",  updateUserInfos);
router.get("/getUserInfos", getUserInfos);
export default router;