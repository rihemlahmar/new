import mongoose from 'mongoose'
import {Imodule} from '../interfaces/Imodule'

const moduleSchema = new mongoose.Schema({

    name: {
        type: String,
        required:true
      },

    state:{
      type: Boolean,
      required:true
      },

     feature:{
          type: Object
     } 
    },
    {
      timestamps: true
    })
  
  export default mongoose.model<Imodule>('Modules', moduleSchema)