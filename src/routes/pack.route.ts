import express from "express";
import {addPack,getPack,getPacks,updatePack,DeletePack} from "../controllers/pack.controller"
import { auth } from "../middlewares/auth";
import { checkPackData } from "../middlewares/pack.middleware";

const router = express.Router();
router.post("/addpack", auth, addPack);
router.get("/pack/:id", auth, getPack);
router.get("/packs", auth, getPacks);
router.put("/updatepack/:id", auth, checkPackData, updatePack);
router.delete("/removepack/:id", DeletePack);

export default router;
