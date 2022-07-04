import { IReqAuth  } from "../interfaces/IAdmin";
import { ResponseMessage } from "../utils/ResponseMessages";
import moduleModel from '../models/module.model'
import packModel from '../models/pack.model'
import { Response } from "express";
import featureModel from "../models/feature.model";

export async function addModule(req: IReqAuth, res: Response) {
    if (!req.user)
      return res.status(401).json({ success: false, messages: ResponseMessage.invalidAuth });
    try {
      const newModule = new moduleModel(req.body);
      await newModule.save();
      return res.status(200).json({
        success: true,
        message: ResponseMessage.addModule,
        data: newModule,
      });
    } catch (err: any) {
      return res
        .status(500)
        .json({ success: false, message: err.message, data: "" });
    }
  }
  
  export async function getModule(req: IReqAuth, res: Response) {
    if (!req.user)
      return res
        .status(401)
        .json({ success: false, messages: ResponseMessage.invalidAuth });
    try {
      const Module = await moduleModel.findById(req.params.id).populate('packId')
      if (!Module)
        return res.status(404).json({
          success: false,
          message: ResponseMessage.NotExistModule,
          data: "",
        });
      return res.status(200).json({
        success: true,
        message: ResponseMessage.foundModule,
        data: Module,
      });
    } catch (err: any) {
      return res
        .status(500)
        .json({ success: false, message: err.message, data: "" });
    }
  }
  
  export async function getModules(req: IReqAuth, res: Response) {
    if (!req.user)
      return res
        .status(401)
        .json({ success: false, messages: ResponseMessage.invalidAuth });
    try {
      const allModule = await moduleModel.find();
      return res.status(200).json({
        success: true,
        message: ResponseMessage.foundModule,
        data: allModule,
      });
    } catch (err: any) {
      return res
        .status(500)
        .json({ success: false, message: err.message, data: "" });
    }
  }
  
  export async function updateModule(req: IReqAuth, res: Response) {
    if (!req.user)
      return res
        .status(401)
        .json({ success: false, messages: ResponseMessage.invalidAuth });
    try {
      const existingPack = await packModel.findById(req.body.packId)
      if(!existingPack) return res.status(404).json({succes : false , message : ResponseMessage.NotExistPack , data:""})
      const updateModule = await moduleModel.findByIdAndUpdate(
        req.params.id,
        { $set: { ...req.body } },
        { new: true },
      );
      if (!updateModule)
        return res.status(404).json({
          success: false,
          message: ResponseMessage.NotExistModule,
        });
      return res.status(200).json({
        success: true,
        message: ResponseMessage.updateModule,
        data: updateModule,
      });
    } catch (err: any) {
      return res
        .status(500)
        .json({ success: false, message: err.message, data: "" });
    }
  }
  
  export async function DeleteModule(req: IReqAuth, res: Response) {
    if (!req.user)
      return res
        .status(401)
        .json({ success: false, messages: ResponseMessage.invalidAuth });
    try {
      const feature = await featureModel.find({"moduleId":req.params.id}).deleteMany
      const Module = await moduleModel.findByIdAndDelete(req.params.id);
      if (!Module)
        return res.status(404).json({
          success: false,
          message: ResponseMessage.NotExistModule,
          data: "",
        });
  
      return res.status(200).json({
        success: true,
        message: ResponseMessage.deleteModule,
        daa: "",
      });
    } catch (err: any) {
      return res
        .status(500)
        .json({ success: false, message: err.message, data: "" });
    }
  }
  
  
  
  
  