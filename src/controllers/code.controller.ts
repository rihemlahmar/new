import { Request, Response } from 'express'
import Users from '../models/admin.model'
import { ResponseMessage } from "../utils/ResponseMessages"
import{sendCode,codeVerify}from '../../config/sendCode'
import { validateEmail, validPhone } from '../middlewares/validateResources'


export async function sendcode (req: Request, res: Response){
    try {
      const { input } = req.body

      if (validPhone(input)) {
        const user = await Users.findOne({ phone: input })
        if (!user)
          return res.status(400).json({success:false,message: ResponseMessage.AccountNotExist , data:""})
        else {
          sendCode(input, "sms")
          return res.json({ success: true, message: ResponseMessage.checkCodePhone, data: { input } })
        }
      }
      if (validateEmail(input)) {
        const user = await Users.findOne({ email: input })
        if (!user)
          return res.status(400).json({ success: false, message: ResponseMessage.AccountNotExist , data:""})
        else {
          sendCode(input, "email")
          return res.json({ success: true, message: ResponseMessage.checkCodeEmail, data: { input } })
        }
      }
    } catch (err: any) {
      return res.status(500).json({ success: false, message: err.message , data:"" })
    }
  }

export async function verifyCode(req: Request, res: Response) {

    try {
      const { input, code } = req.body
      const data = await codeVerify(input, code)

      if (!data?.valid) return res.status(400).json({ success: false, message: ResponseMessage.InvalidCode })

      return res.status(200).json({ success: true,message:"code verify succsesfully", data: {input , code }})
    } catch (err: any) {
      return res.status(500).json({ success: false, message: err.message , data:"" })
    }
  }
