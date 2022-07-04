import express from "express";
import {addModule,getModule,getModules,updateModule,DeleteModule} from "../controllers/module.controller"
import { auth } from "../middlewares/auth";
import { checkModuleData } from "../middlewares/pack.middleware";



const router = express.Router();
router.post("/addmodule", auth,checkModuleData, addModule);
router.get("/module/:id", auth, getModule);
router.get("/modules", auth, getModules);
router.put("/updatemodule/:id", auth,checkModuleData, updateModule);
router.delete("/removemodule/:id", auth, DeleteModule);

export default router;