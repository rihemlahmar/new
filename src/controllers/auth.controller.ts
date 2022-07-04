import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import admins from '../models/admin.model'
import bcrypt from 'bcrypt'
import  {generateAccessToken,jwtDecode} from '../../config/generateToken'
import { ResponseMessage } from "../utils/ResponseMessages"
import { findUser,findUserById, updateUserInfosService} from '../services/admin.service'
import { validateEmail, validPhone } from '../middlewares/validateResources'
import { codeVerify, sendCode } from '../../config/sendCode'
import { IDecodedToken } from '../interfaces/IAdmin'



export async function Register(req: Request, res: Response) {
    try {
        const {firstName,lastName,email,password,phone} = req.body
        const existingAdmin = await findUser({email})
        if(existingAdmin)
        return res.status(400).json({
            success: false,
            message: ResponseMessage.EmailExist,
            data:""
        })
        const passwordHash = await bcrypt.hash(password, 12)
        const newAdmin = { firstName, lastName, email, password: passwordHash ,phone}
        const new_admin = new admins(newAdmin)
        const active_token = generateAccessToken({new_admin})

      await new_admin.save()
       return res.json({
            success: true,
            message: ResponseMessage.RegisterSuccess, 
            data:{firstName:firstName,lastName:lastName,email : email, phone : phone},
            acces_token:active_token
            })

    } catch (error:any) {
        return res.status(500).json({success: false,message: error.message,data:""})
    }
}

export async function login(req: Request, res: Response) {
  
    try {
      const {email , password}=req.body
      const existingAdmin =  await findUser({email})
      if(!existingAdmin)
      return res.status(400).json({
          success: false,
          msg: ResponseMessage.AccountNotExist,
      })
      //bcrypt chek password 
      const isMatch = await bcrypt.compare(password, existingAdmin.password)
      if (!isMatch) return res.status(400).json({
           success: false,
            msg: ResponseMessage.VerifiyPassword })
        const active_token = generateAccessToken({id: existingAdmin._id ,email:existingAdmin.email , phone:existingAdmin.phone})
        
  
        return res.status(200).json({
            status: true,
            message :ResponseMessage.LoginSuccess,
            data :{"firstName":existingAdmin.firstName,"lastName":existingAdmin.lastName,"email" : existingAdmin.email, "phone" : existingAdmin.phone},
            acces_token:active_token

        })
    } catch  (error:any) {
        return res.status(400).json({success: false,message: error.message, data:""})
        
    }
}

export async function forgotPassword(req: Request, res: Response) {
    try {
      const { input } = req.body;
      const findUser = await admins.findOne({ input });
  
      if (validPhone(input)) {
        const user = await admins.findOne({ phone: input });
        if (!user)
          return res
            .status(400)
            .json({ success: false, message: ResponseMessage.AccountNotExist });
        else {
          sendCode(input, "sms");
          console.log(input);
          return res.json({
            success: true,
            message: ResponseMessage.checkCodePhone,
            data: { input },
          });
        }
      }
      if (validateEmail(input)) {
        const user = await admins.findOne({ email: input });
        if (!user)
          return res
            .status(400)
            .json({ success: false, message: ResponseMessage.AccountNotExist });
        else {
          // sendCode(input, "email");
          return res.json({
            success: true,
            message: ResponseMessage.checkCodeEmail,
            data: { input },
          });
        }
      }
    } catch (err: any) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

  export async function verifyCode(req: Request, res: Response) {
    try {
      const { input, code } = req.body;
      const data = await codeVerify(input, code);
  
      if (!data?.valid)
        return res.status(400).json({
          success: false,
          message: ResponseMessage.InvalidCode,
          data: "",
        });
  
      return res.json({
        success: true,
        message: "code verify succsesfully",
        data: { input, code },
      });
    } catch (err: any) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }

export async function resetPassword(req: Request, res: Response) {
    try {
      const { newpassword, input } = req.body;
  
      const passwordHash = await bcrypt.hash(newpassword, 12);
  
      if (validPhone(input)) {
        await admins.findOneAndUpdate(
          { phone: input },
          {
            password: passwordHash,
          },
        );
      }
      if (validateEmail(input)) {
        await admins.findOneAndUpdate(
          { email: input },
          {
            password: passwordHash,
          },
        );
      }
      return res.status(200).json({
        success: true,
        message: ResponseMessage.UpdatePassword,
        data: "",
      });
    } catch (err: any) {
      return res
        .status(500)
        .json({ success: false, message: err.message, data: "" });
    }
  }

export async function changePassword(req: Request, res: Response) {
    try {
      const { oldPassword, newPassword } = req.body;
      let { id } = jwtDecode(req);
      const user = await findUserById({ _id: id });
  
      const match = user && (await bcrypt.compare(oldPassword, user.password));
      if (match) {
        const passwordHash = await bcrypt.hash(newPassword, 12);
        await updateUserInfosService(id, { password: passwordHash });
        return res.status(200).send({
          success: true,
          message: "Password Updated",
          data: "",
        });
      } else {
        return res
          .status(400)
          .send({ success: false, message: "Wrong Password", data: "" });
      }
    } catch (err: any) {
      return res
        .status(500)
        .json({ success: false, message: err.message, data: "" });
    }
  }

  export async function VerifyToken(req: Request, res: Response) {
    try {
      const token = req.header("Authorization");
      if (!token) {
        return res.status(401).json({
          success: false,
          message: ResponseMessage.invalidAuth,
          data: "",
        });
      }
      const decoded = <IDecodedToken>(
        jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`)
      );
      if (decoded) {
        return res.status(200).json({
          success: true,
          message: ResponseMessage.succesAuth,
          data: "",
        });
      }
    } catch (error: any) {
      return res.status(401).json({
        success: false,
        message: ResponseMessage.invalidAuth,
        data: "",
      });
    }
  }
  
  export async function iExpired(req: Request, res: Response) {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];
    console.log("token", token);
  
    try {
      const expiry = JSON.parse(atob(token.split(".")[1])).exp;
      console.log(expiry);
  
      if (expiry < (new Date().getTime() + 1) / 1000)
        return res
          .status(400)
          .json({ succes: false, message: "token expired", data: "" });
      else
        return res
          .status(200)
          .json({ succes: false, message: "token not expired", data: expiry });
    } catch (err: any) {
      return res
        .status(500)
        .json({ success: false, message: err.message, data: "" });
    }
  }
