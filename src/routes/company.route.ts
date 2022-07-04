import express from "express";
import { Request, Response } from 'express'
import multer from "multer";
import path from "path";
import {addCompany,getCompany,getAllCompanies,updateCompany,deleteCompany} from "../controllers/listOfCompany.controller"
import { auth } from "../middlewares/auth";
import { checkCompanyData } from "../middlewares/company.middelwares";
import {upload} from "../middlewares/upload.middleware"
  


const router = express.Router();
router.post("/addcompany",upload.single('logo'), addCompany);
router.get("/company/:id",  getCompany);
router.get("/companies",  getAllCompanies);
router.post("/updatecompany/:id", updateCompany);
router.delete("/removecompany/:id",  deleteCompany);
router.post("/upload", upload.single('profile'), (req: Request, res: Response) => {
    console.log("profile",req.file)

    res.json({
        success: 1,
        profile_url: `http://localhost:5000/profile/${req.file?.filename}`
    })
})

export default router;
