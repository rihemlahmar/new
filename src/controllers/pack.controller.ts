import { IReqAuth  } from "../interfaces/IAdmin";
import { ResponseMessage } from "../utils/ResponseMessages";
import packModel from '../models/pack.model'
import {  Request,Response } from "express";
import moduleModel from "../models/module.model";
import { codeVerify } from "../../config/sendCode";
import { jwtDecode } from "../../config/generateToken";

export async function addPack(req: Request, res: Response) {
    try {
      console.log(req.body)
      const { name  } = req.body;
      const existingPack = await packModel.findOne({ name });
  
      if (existingPack) {
        return res.status(400).json({
          success: false,
          message: ResponseMessage.existingPack,
          data: "",
        });
      }
      const allModule =  await moduleModel.find()
      console.log("allModule",allModule)
      const data = {
        name:name ,
        module:allModule
      }
      const newPack = new packModel(data);
      await newPack.save();
      return res.status(200).json({
        success: true,
        message: ResponseMessage.addPack,
        data: newPack,
      });
    } catch (err: any) {
      return res
        .status(500)
        .json({ success: false, message: err.message, data: "" });
    }
  }
  
export async function getPack(req: IReqAuth, res: Response) {
    if (!req.user)
      return res
        .status(401)
        .json({ success: false, messages: ResponseMessage.invalidAuth });
    try {
      const Pack = await packModel.findById(req.params.id);
      if (!Pack)
        return res.status(404).json({
          success: false,
          message: ResponseMessage.NotExistPack,
          data: "",
        });
      return res.status(200).json({
        success: true,
        message: ResponseMessage.foundPack,
        data: Pack,
      });
    } catch (err: any) {
      return res
        .status(500)
        .json({ success: false, message: err.message, data: "" });
    }
  }
  
export async function getPacks(req: IReqAuth, res: Response) {
    if (!req.user)
      return res
        .status(401)
        .json({ success: false, messages: ResponseMessage.invalidAuth });
    try {
      const allPack = await packModel.find();
      return res.status(200).json({
        success: true,
        message: ResponseMessage.foundPack,
        data: allPack,
      });
    } catch (err: any) {
      return res
        .status(500)
        .json({ success: false, message: err.message, data: "" });
    }
  }
  
export async function updatePack(req: IReqAuth, res: Response) {
    if (!req.user)
      return res
        .status(401)
        .json({ success: false, messages: ResponseMessage.invalidAuth });
    try {
      const updatePack = await packModel.findByIdAndUpdate(
        req.params.id,
        { $set: { ...req.body } },
        { new: true },
      );
      if (!updatePack)
        return res.status(404).json({
          success: false,
          message: ResponseMessage.NotExistPack,
        });
      return res.status(200).json({
        success: true,
        message: ResponseMessage.updatePack,
        data: updatePack,
      });
    } catch (err: any) {
      return res
        .status(500)
        .json({ success: false, message: err.message, data: "" });
    }
  }

  
export async function DeletePack(req: Request, res: Response) {
    try {
      const {code}=req.body
      console.log("log",req)
      let { phone } = jwtDecode(req);
      const dataVerify = await codeVerify("+21625498372", code)
      if (!dataVerify?.valid) return res.status(400).json({ success: false, message: ResponseMessage.InvalidCode })
      const company = await packModel.findByIdAndDelete(req.params.id);
      if (!company)
        return res.status(404).json({
          success: false,
          message: ResponseMessage.NotExistPack,
          data: "",
        });
  
      return res.status(200).json({
        success: true,
        message: ResponseMessage.deletePack,
        daa: "",
      });
    } catch (err: any) {
      console.log("err",err.message)
      return res
        .status(500)
        .json({ success: false, message: err.message, data: "" });
    }
  }
  
  
  
  
  
  