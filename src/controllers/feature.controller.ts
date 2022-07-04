import { IReqAuth  } from "../interfaces/IAdmin";
import { Response } from "express";
import { ResponseMessage } from "../utils/ResponseMessages";
import featureModel from '../models/feature.model'
import moduleModel from '../models/module.model'



export async function addFeature(req: IReqAuth, res: Response) {
    if (!req.user)
      return res.status(401).json({ success: false, messages: ResponseMessage.invalidAuth });
    try {
      const { name } = req.body;
      const existingFeature = await featureModel.findOne({ name });
      const existingModule = await moduleModel.findById(req.body.moduleId)
      if(!existingModule) return res.status(404).json({succes : false , message : ResponseMessage.NotExistModule , data:""})
  
      if (existingFeature) {
        return res.status(400).json({
          success: false,
          message: ResponseMessage.existingFeature,
          data: "",
        });
      }
      const newFeature = new featureModel(req.body);
      await newFeature.save();
      return res.status(200).json({
        success: true,
        message: ResponseMessage.addFeature,
        data: newFeature,
      });
    } catch (err: any) {
      return res
        .status(500)
        .json({ success: false, message: err.message, data: "" });
    }
  }
  
  export async function getFeature(req: IReqAuth, res: Response) {
    if (!req.user)
      return res
        .status(401)
        .json({ success: false, messages: ResponseMessage.invalidAuth });
    try {
      const Feature = await featureModel.findById(req.params.id)/*** .populate('moduleId')*/;
      if (!Feature)
        return res.status(404).json({
          success: false,
          message: ResponseMessage.NotExistFeature,
          data: "",
        });
      return res.status(200).json({
        success: true,
        message: ResponseMessage.foundFeature,
        data: Feature,
      });
    } catch (err: any) {
      return res
        .status(500)
        .json({ success: false, message: err.message, data: "" });
    }
  }
  
  export async function getFeatures(req: IReqAuth, res: Response) {
    if (!req.user)
      return res
        .status(401)
        .json({ success: false, messages: ResponseMessage.invalidAuth });
    try {
      const allFeature = await featureModel.find();
      return res.status(200).json({
        success: true,
        message: ResponseMessage.foundFeature,
        data: allFeature,
      });
    } catch (err: any) {
      return res
        .status(500)
        .json({ success: false, message: err.message, data: "" });
    }
  }

  
  
  export async function updateFeature(req: IReqAuth, res: Response) {
    if (!req.user)
      return res
        .status(401)
        .json({ success: false, messages: ResponseMessage.invalidAuth });
    try {
      const existingModule = await moduleModel.findById(req.body.moduleId)
      if(!existingModule) return res.status(404).json({succes : false , message : ResponseMessage.NotExistModule , data:""})
      const updateFeature = await featureModel.findByIdAndUpdate(
        req.params.id,
        { $set: { ...req.body } },
        { new: true },
      );
      if (!updateFeature)
        return res.status(404).json({
          success: false,
          message: ResponseMessage.NotExistFeature,
        });
      return res.status(200).json({
        success: true,
        message: ResponseMessage.updateFeature,
        data: updateFeature,
      });
    } catch (err: any) {
      return res
        .status(500)
        .json({ success: false, message: err.message, data: "" });
    }
  }
  
  export async function DeleteFeature(req: IReqAuth, res: Response) {
    if (!req.user)
      return res
        .status(401)
        .json({ success: false, messages: ResponseMessage.invalidAuth });
    try {
      const Feature = await featureModel.findByIdAndDelete(req.params.id);
      if (!Feature)
        return res.status(404).json({
          success: false,
          message: ResponseMessage.NotExistFeature,
          data: "",
        });
  
      return res.status(200).json({
        success: true,
        message: ResponseMessage.deleteFeature,
        daa: "",
      });
    } catch (err: any) {
      return res
        .status(500)
        .json({ success: false, message: err.message, data: "" });
    }
  }
  
  
  
  
  