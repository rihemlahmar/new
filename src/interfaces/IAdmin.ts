import { Document } from "mongoose"
import { Request } from 'express'
export interface IAdmin extends Document {
  firstName: string
  lastName: string
  email: string
  password: string
  phone: string
  avatar : string
  _doc: object
  }
  export interface IAdmin {
    firstName: string
    lastName: string
    account: string
    password: string
  }
  export interface IReqAuth extends Request {
    user?: IAdmin
 }

 export interface IDecodedToken {
  id?: string
  newUser?: IAdmin
  iat: number
  exp: number
}