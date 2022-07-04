import { Document } from "mongoose"
export interface Inotification extends Document {
  title : String
  description : String
  type:String
  sendingDate :Date
  listOfCompany:[String]
  
  _doc: object
  }