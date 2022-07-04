import { Document } from "mongoose"
import { Imodule } from "./Imodule"
export interface Ipack extends Document {
  name:String
  module : Imodule[]
  _doc: object
  }