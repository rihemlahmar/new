import mongoose from 'mongoose'
import {Ipack} from '../interfaces/Ipack'

const packSchema = new mongoose.Schema({

    name: {
        type: String,
        required:[true, "Please enter pack name"],
        trim: true,
      },
      module:[{type : Object}],
        
    
    }, {
      timestamps: true
    })
  export default mongoose.model<Ipack>('Packs', packSchema)