import mongoose from 'mongoose'
import { buffer } from 'stream/consumers'
import {ICompany} from '../interfaces/ICompany'

const  listOfCompanySchema = new mongoose.Schema({
    name: {
        type: String,
        required:[true, "Please enter company name "],
        trim: true,
        minlength:[3,"company name  must be atleast 3 character long"],
        maxLength: [20, "company name is up to 20 chars long."]
      },
      email: {
        type: String,
        required:[true, "Please enter company email "],
        trim: true,
        unique: true,
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          'Please add a valid email'
      ]
        // validate:[isEmail, "please enter a valid email"]
      },
      address: {
        type: String,
        required:[true, "Please enter company address "],
        trim: true,
      },
      patenteNumber: {
        type: String,
        required:[true, "Please enter company patente Number "],
        trim: true,
      },
      status: {
        type: String,
        
        enum:["disable","enable"],
        default:"disable"
      },
      logo: {
       type : String
      },
      packId: {
        type: mongoose.Types.ObjectId,
       ref:"Packs"
      },
      dateOfBuy: {
        type: Date,
      },
      expirationDate: {
        type: Date,
        
        
      },
      
      
    }, {
      // timestamps: true
    })

export default mongoose.model('ListOfCompany', listOfCompanySchema)