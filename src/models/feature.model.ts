import mongoose from 'mongoose'
import {Ifeautre} from '../interfaces/Ifeature'

const featureSchema = new mongoose.Schema({

    name: {
        type: String,
      },
      moduleId: {
        type: mongoose.Types.ObjectId,
        ref: "Modules"
      },
      
      
    }, {
      timestamps: true
    })
  
  export default mongoose.model<Ifeautre>('Features', featureSchema)