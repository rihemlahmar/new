import {  Request, Response ,NextFunction } from "express";
import jwt from 'jsonwebtoken'
import { validateEmail, validPhone } from "./validateResources";
import {ResponseMessage} from "../utils/ResponseMessages"


export const checkRegisterData = async (req:Request, res:Response, next:NextFunction) => {

  
  const {firstName,lastName,email,password,phone} = req.body
  if(!firstName )
  return res.status(400).json({success : false ,message: ResponseMessage.firstname,data:""})
  if(!lastName )
  return res.status(400).json({success : false ,message: ResponseMessage.lastname,data:""})
  if(!email )
  return res.status(400).json({success : false ,message: ResponseMessage.email,data:""})
  if(!password )
  return res.status(400).json({success : false ,message:ResponseMessage.password ,data:""})
  if(password.length < 6){
    return res.status(400).json({success : false,message: ResponseMessage.passLength,data:""})
  }
  if(!phone )
  return res.status(400).json({success : false ,message:ResponseMessage.phone ,data:""})
 if(!validateEmail(email))
  return res.status(400).json({success : false,message:ResponseMessage.InvalidEmail,data:""})
  
  if( !validPhone(phone)){
      return res.status(400).json({success : false,message: ResponseMessage.InvalidPhone,data:""})
    }
  

  next();
  }

export const checkLoginData = async (req:Request, res:Response, next:NextFunction) => {

  
    const {email,password} = req.body
    if(!email )
    return res.status(400).json({success : false ,message: ResponseMessage.email,data:""})
    if(!password )
    return res.status(400).json({success : false ,message: ResponseMessage.password,data:""})
   if(!validateEmail(email))
    return res.status(400).json({success : false,message: ResponseMessage.InvalidEmail,data:""})
    
  
    next();
    }

    export const checkForgotPassData = async (req:Request, res:Response, next:NextFunction) => {

  
      const {input} = req.body
      if(!input)
      return res.status(400).json({succes:false, message: "Please Enter  email or phone number",data:""})
   
      
    
      next();
      }

      export const checkverifyCodetData = async (req:Request, res:Response, next:NextFunction) => {

        const {input,code} = req.body
      if(!input)
      return res.status(400).json({succes : false , message: "Please Enter a email or phone number",data:""})
      if(!code)
      return res.status(400).json({succes:false , message: "Please Enter the code ",data:""})
      
        next();
      }
  
      
    export const checkResetPassData = async (req:Request, res:Response, next:NextFunction) => {
      const {input,newpassword} = req.body
      if(!input)
      return res.status(400).json({succes:false, message: "Please Enter  email or phone number",data:""})
    
      if(!newpassword )
      return res.status(400).json({success : false ,message: "Please Enter your new password.",data:""})
      if(newpassword.length < 6){
        return res.status(400).json({success : false,message: ResponseMessage.passLength,data:""})
      }
      
        next();
      }
 export const checkChangePassword = async (
        req: Request,
        res: Response,
        next: NextFunction,
      ) => {
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword && !newPassword)
          return res.status(400).json({
            success: false,
            message: "Required Data",
            data: "",
          });
        if (newPassword.length < 6) {
          return res
            .status(400)
            .json({ success: false, message: ResponseMessage.passLength, data: "" });
        }
        next();
      };