import {  Request, Response ,NextFunction } from "express";
export const checkPackData = async (req:Request, res:Response, next:NextFunction) => {

  const {name,price} = req.body
  if(!name )
  return res.status(400).json({success : false ,message: 'please enter a Pack name',data:""})
  if(!price )
  return res.status(400).json({success : false ,message: 'please enter the price ',data:""})
  
  next();
      
    
}

export const checkModuleData = async (req:Request, res:Response, next:NextFunction) => {

  const {name,state,feature} = req.body
  if(!name )
  return res.status(400).json({success : false ,message: 'please enter a Module name',data:""})
  if(!state )
  return res.status(400).json({success : false ,message: 'please enter a state',data:""})
  if(!feature )
  return res.status(400).json({success : false ,message: 'please enter a feature',data:""})
 
 

  next();
      
    
}

export const checkFeatureData = async (req:Request, res:Response, next:NextFunction) => {

  const {name,moduleId} = req.body
  if(!name )
  return res.status(400).json({success : false ,message: 'please enter a feature name',data:""})
  // if(!moduleId )
  // return res.status(400).json({success : false ,message: 'please enter a module',data:""})
 

  next();
      
    
}
      




    
