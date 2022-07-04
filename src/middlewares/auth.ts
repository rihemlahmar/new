import { Response, NextFunction ,Request} from 'express'
import Users from '../models/admin.model'
import jwt from 'jsonwebtoken'
import { IDecodedToken, IReqAuth } from '../interfaces/IAdmin'
import { ResponseMessage } from '../utils/ResponseMessages'

 export const auth = async (req:IReqAuth, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")
    if(!token) {return res.status(401).json({success : false ,message: ResponseMessage.invalidAuth, data:""})}

    const decoded = <IDecodedToken>jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`)
    if(!decoded){ return res.status(401).json({success : false ,message: ResponseMessage.invalidAuth, data:decoded})}

    const recruiter = await Users.findById({_id: decoded.id})
    console.log(recruiter)
    if(!recruiter) {return res.status(400).json({success : false ,message: ResponseMessage.AccountNotExist, data:""})}

    req.user = recruiter;
    

    next()
  } catch (err: any) {
    return res.status(500).json({success : false ,message: err.message , data:""})
  }
}

