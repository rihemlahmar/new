import {  Request, Response ,NextFunction } from "express";
import { ResponseMessage } from "../utils/ResponseMessages";
import { validateEmail ,validPhone } from "./validateResources";

export const checkSendCodetData = async (req:Request, res:Response, next:NextFunction) => {
    
    const {input}=req.body
    
      if(!input){
        return res.status(400).json({success : false,message:`please enter aa phone number `,data:""})
      }

    if
     (!validPhone(input)){
      return res.status(400).json({success : false,message:ResponseMessage.InvalidPhone,data:""})
     }
    else if(!validateEmail(input)){
      return res.status(400).json({success : false,message:ResponseMessage.InvalidEmail,data:""})
    }
      }
      
    


export const checkVerifyCodetData = async (req:Request, res:Response, next:NextFunction) => {
    
  const {input, code}=req.body
  
    if(!input){
      return res.status(400).json({success : false,message:`please enter adress mail or phone number `,data:""})
    }
    if(!code){
      return res.status(400).json({success : false,message:`please enter the code `,data:""})
    }
    

  // if(!validateEmail(input))
  //   return res.status(400).json({success : false,message:ResponseMessage.InvalidEmail,data:""})
  
  // if (!validPhone(input))
  //     return res.status(400).json({success : false,message:ResponseMessage.InvalidPhone,data:""})
    
    
  
}