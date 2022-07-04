import { Document } from "mongoose"
export interface ICompany extends Document {
  name:String
  email : String 
  status : String
  address : string 
  patenteNumber : number
  dateOfBuy : Date
  expirationDate : Date
  logo: String 
  _doc: object
  }