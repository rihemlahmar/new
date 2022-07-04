import {  Request, Response ,NextFunction } from "express";
export const checkCompanyData = async (req:Request, res:Response, next:NextFunction) => {

  const {name,email,status,address,patenteNumber,dateOfBuy,packId} = req.body
  if(!name )
  return res.status(400).json({success : false ,message: 'please enter a Company name',data:""})
  if(!email )
  return res.status(400).json({success : false ,message: 'please enter a Company email',data:""})
  // if(!status )
  // return res.status(400).json({success : false ,message: 'please enter a Company status',data:""})
  if(!address )
  return res.status(400).json({success : false ,message: 'please enter a Company address',data:""})
  if(!patenteNumber )
  return res.status(400).json({success : false ,message: 'please enter a Company patenteNumber',data:""})
  if(!dateOfBuy )
  return res.status(400).json({success : false ,message: 'please enter a date Of Buy',data:""})
  if(!packId )
  return res.status(400).json({success : false ,message: 'please enter a pack',data:""})
 

  next();
      
    
}

