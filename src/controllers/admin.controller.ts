import { Request, Response } from "express";
import { jwtDecode } from "../../config/generateToken";
import { getUserInfosService, updateUserInfosService } from "../services/admin.service";
import { getUserData } from "../utils/globale";
import { ResponseMessage } from "../utils/ResponseMessages";


export async function getUserInfos(req: Request, res: Response) {
    try {
      let { id } = jwtDecode(req);
      const data = await getUserInfosService(id);
      return res.json({success: true,message: ResponseMessage.dataFound,
        data: getUserData(data),
      });
    } catch (error: any) {
      return res
        .status(500)
        .json({ success: false, message: error.message, data: "" });
    }
  }
  


  export async function updateUserInfos(req: Request, res: Response) {
    const { firstName, lastName, phone } = req.body;
    try {
      let { id } = jwtDecode(req);
      const data = await updateUserInfosService(id, {
        firstName,
        lastName,
        phone,
      });
      return res.json({
        success: true,
        message: ResponseMessage.dataUpdated,
        data: getUserData(data),
      });
    } catch (error: any) {
      return res
        .status(500)
        .json({ success: false, message: error.message, data: "" });
    }
  }