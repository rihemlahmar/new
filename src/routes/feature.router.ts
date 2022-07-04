import express from "express";
import {addFeature,getFeature,getFeatures,updateFeature,DeleteFeature} from "../controllers/feature.controller"
import { auth } from "../middlewares/auth";
import { checkFeatureData } from "../middlewares/pack.middleware";



const router = express.Router();
router.post("/addfeature", auth,checkFeatureData, addFeature);
router.get("/feature/:id", auth, getFeature);
router.get("/features", auth, getFeatures);
router.put("/updatefeature/:id", auth,checkFeatureData, updateFeature);
router.delete("/removefeature/:id", auth, DeleteFeature);

export default router;