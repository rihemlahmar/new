import { IReqAuth  } from "../interfaces/IAdmin";
import { ResponseMessage } from "../utils/ResponseMessages";
import companyModel from '../models/listOfCompany.model'
import {  Request,Response } from "express";
import { codeVerify } from "../../config/sendCode";

export async function addCompany(req: Request, res: Response) {
    // if (!req.user)
    //   return res.status(401).json({ success: false, messages: ResponseMessage.invalidAuth });
    try {
      
      const imgName = req.file?.path.slice(14,req.file?.path.length)
      const url ="http://localhost:5000/profile/"+imgName
    
      console.log("logo test 12 3 4 ",url)
      const existingCompany = await companyModel.findOne({ name:req.body.name });
  
      if (existingCompany) {
        return res.status(400).json({
          success: false,
          message: ResponseMessage.existingCompany,
          data: "",
        });
      }
      
      const newCompany = new companyModel({name:req.body.name,email:req.body.email,
        address:req.body.address,
        patenteNumber:req.body.patenteNumber,
        status:req.body.status,
        logo:url,
        packId:req.body.packId,
        dateOfBuy:req.body.dateOfBuy});
      await newCompany.save();
      return res.status(200).json({
        success: true,
        message: ResponseMessage.addCompany,
        data: newCompany,
      });
    } catch (err: any) {
      return res
        .status(500)
        .json({ success: false, message: err.message, data: "" });
    }
  }
  
export async function getCompany(req: Request, res: Response) {
    // if (!req.user)
    //   return res
    //     .status(401)
    //     .json({ success: false, messages: ResponseMessage.invalidAuth });
    try {
      const company = await companyModel.findById(req.params.id).populate("packId",["_id","name"]);
      if (!company)
        return res.status(404).json({
          success: false,
          message: ResponseMessage.NotExistCompany,
          data: "",
        });
      return res.status(200).json({
        success: true,
        message: ResponseMessage.foundCompany,
        data: company,
      });
    } catch (err: any) {
      return res
        .status(500)
        .json({ success: false, message: err.message, data: "" });
    }
  }
  
export async function getAllCompanies(req: Request, res: Response) {
    // if (!req.user)
    //   return res
    //     .status(401)
    //     .json({ success: false, messages: ResponseMessage.invalidAuth });
    try {
      const allCompanies = await companyModel.find().populate("packId");
      return res.status(200).json({
        success: true,
        message: ResponseMessage.foundCompany,
        data: allCompanies,
      });
    } catch (err: any) {
      return res
        .status(500)
        .json({ success: false, message: err.message, data: "" });
    }
  }
  

export async function updateCompany(req: IReqAuth, res: Response) {
  
    // if (!req.user)
    //   return res
    //     .status(401)
    //     .json({ success: false, messages: ResponseMessage.invalidAuth });
    try {
      const {data, code } = req.body
      
      console.log(req.body)
      console.log(req.params.id)
  const dataVerify = await codeVerify("+21625498372", code)
  if (!dataVerify?.valid) return res.status(400).json({ success: false, message: ResponseMessage.InvalidCode })
      const updateCompany = await companyModel.findByIdAndUpdate(
        req.params.id,
        { $set: { ...req.body  } },
        { new: true },
      );
      if (!updateCompany)
        return res.status(404).json({
          success: false,
          message: ResponseMessage.NotExistCompany,
        });
      return res.status(200).json({
        success: true,
        message: ResponseMessage.updateCompany,
        data: updateCompany,
      });
    } catch (err: any) {
      console.log(err.msg)
      return res
        .status(500)
        .json({ success: false, message: err.message, data: "" });
        
    }
  }
  
export async function deleteCompany(req: Request, res: Response) {
    try {
      const {code}=req.body
      const dataVerify = await codeVerify("+21625498372", code)
      if (!dataVerify?.valid) return res.status(400).json({ success: false, message: ResponseMessage.InvalidCode })
      const company = await companyModel.findByIdAndDelete(req.params.id);
      if (!company)
        return res.status(404).json({
          success: false,
          message: ResponseMessage.NotExistCompany,
          data: "",
        });
  
      return res.status(200).json({
        success: true,
        message: ResponseMessage.deleteCompany,
        daa: "",
      });
    } catch (err: any) {
      console.log("err",err.message)
      return res
        .status(500)
        .json({ success: false, message: err.message, data: "" });
    }
  }