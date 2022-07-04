import express from "express";
import {addNotification,getNotification,getAllNotification,updateNotification,DeleteNotification} from "../controllers/notification.controller"
import { auth } from "../middlewares/auth";
import { checkNotificationData } from "../middlewares/notification.middlewere"

const router = express.Router();
router.post("/addnotification", auth, checkNotificationData,addNotification );
router.get("/notification/:id", auth, getNotification);
router.get("/notifications", auth,getAllNotification );
router.put("/updatenotification/:id", auth, checkNotificationData,updateNotification );
router.delete("/removenotification/:id", auth, DeleteNotification);

export default router;
