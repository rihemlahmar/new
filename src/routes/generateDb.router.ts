import express from "express";
import { auth } from '../middlewares/auth'
import {generateRecruiterDB} from "../controllers/generatDB.controller"


const router = express.Router();
router.post("/db", auth, generateRecruiterDB);


export default router;
