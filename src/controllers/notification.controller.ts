import { IReqAuth  } from "../interfaces/IAdmin";
import { ResponseMessage } from "../utils/ResponseMessages";
import notificationModel from '../models/notification.model'
import {  Request,Response } from "express";

export async function addNotification(req: IReqAuth, res: Response) {
    if (!req.user)
      return res.status(401).json({ success: false, messages: ResponseMessage.invalidAuth });
    try {
      // const { title  } = req.body;
      // const existingNotification = await notificationModel.findOne({ title });
  
      // if (existingNotification) {
      //   return res.status(400).json({
      //     success: false,
      //     message: ResponseMessage.existingPack,
      //     data: "",
      //   });
      // }
      const newNotification = new notificationModel(req.body);
      await newNotification.save();
      return res.status(200).json({
        success: true,
        message: ResponseMessage.addNotification,
        data: newNotification,
      });
    } catch (err: any) {
      return res
        .status(500)
        .json({ success: false, message: err.message, data: "" });
    }
  }
  
export async function getNotification(req: IReqAuth, res: Response) {
    if (!req.user)
      return res
        .status(401)
        .json({ success: false, messages: ResponseMessage.invalidAuth });
    try {
      const Notification = await notificationModel.findById(req.params.id);
      if (!Notification)
        return res.status(404).json({
          success: false,
          message: ResponseMessage.NotExistNotification,
          data: "",
        });
      return res.status(200).json({
        success: true,
        message: ResponseMessage.foundNotification,
        data: Notification,
      });
    } catch (err: any) {
      return res
        .status(500)
        .json({ success: false, message: err.message, data: "" });
    }
  }
  
export async function getAllNotification(req: IReqAuth, res: Response) {
    if (!req.user)
      return res
        .status(401)
        .json({ success: false, messages: ResponseMessage.invalidAuth });
    try {
      const allNotification = await notificationModel.find();
      return res.status(200).json({
        success: true,
        message: ResponseMessage.foundNotification,
        data: allNotification,
      });
    } catch (err: any) {
      return res
        .status(500)
        .json({ success: false, message: err.message, data: "" });
    }
  }
  
export async function updateNotification(req: IReqAuth, res: Response) {
    if (!req.user)
      return res
        .status(401)
        .json({ success: false, messages: ResponseMessage.invalidAuth });
    try {
      const updateNotification = await notificationModel.findByIdAndUpdate(
        req.params.id,
        { $set: { ...req.body } },
        { new: true },
      );
      if (!updateNotification)
        return res.status(404).json({
          success: false,
          message: ResponseMessage.NotExistNotification,
        });
      return res.status(200).json({
        success: true,
        message: ResponseMessage.updateNotification,
        data: updateNotification,
      });
    } catch (err: any) {
      return res
        .status(500)
        .json({ success: false, message: err.message, data: "" });
    }
  }
  
export async function DeleteNotification(req: IReqAuth, res: Response) {
    if (!req.user)
      return res
        .status(401)
        .json({ success: false, messages: ResponseMessage.invalidAuth });
    try {
      const Notification = await notificationModel.findByIdAndDelete(req.params.id);
      if (!Notification)
        return res.status(404).json({
          success: false,
          message: ResponseMessage.NotExistNotification,
          data: "",
        });
  
      return res.status(200).json({
        success: true,
        message: ResponseMessage.deletePack,
        daa: "",
      });
    } catch (err: any) {
      return res
        .status(500)
        .json({ success: false, message: err.message, data: "" });
    }
  }
  
  
  
  
  