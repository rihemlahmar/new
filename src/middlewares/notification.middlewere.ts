import {  Request, Response ,NextFunction } from "express";
export const checkNotificationData = async (req:Request, res:Response, next:NextFunction) => {

  const {title,description,type,sendingDate,listOfCompany} = req.body
  if(!title )
  return res.status(400).json({success : false ,message: 'please enter a notification title',data:""})
  if(!description )
  return res.status(400).json({success : false ,message: 'please enter the description ',data:""})
  if(!type )
  return res.status(400).json({success : false ,message: 'please enter a notification type',data:""})
  if(type !="success" && type  !="info" &&  type  !="warning" &&  type  !="danger"){ 
    return res.status(400).json({success : false ,message: 'notification type must be success , info ,warning,danger',data:""})

  }
  if(!sendingDate )
  return res.status(400).json({success : false ,message: 'please enter the  notification sending Date',data:""})
  if(!listOfCompany )
  return res.status(400).json({success : false ,message: 'please enter the  company name ',data:""})
 

  next();
      
    
}