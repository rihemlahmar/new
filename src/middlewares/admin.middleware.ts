import { Request, Response, NextFunction } from "express";
import { ResponseMessage } from "../utils/ResponseMessages";
import {  validPhone } from "./validateResources";


export const checkChangeInfoData = async (req: Request,res: Response,next: NextFunction,) => {
  const {firstName,lastName,phone} = req.body
  if(!firstName )
  return res.status(400).json({success : false ,message: 'please enter your firstName',data:""})
  if(!lastName )
  return res.status(400).json({success : false ,message: 'please enter your lastName',data:""})
  if(!phone )
  return res.status(400).json({success : false ,message: 'please enter your phone',data:""})
  
    if (!validPhone(phone))
      return res.status(400).json({
        success: false,
        message: ResponseMessage.InvalidPhone,
        data: "",
      });
    next();
  };