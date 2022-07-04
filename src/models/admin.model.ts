import mongoose from 'mongoose'
import {IAdmin} from '../interfaces/IAdmin'

const adminSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required:[true, "Please enter your firstname "],
        trim: true,
        minlength:[3,"first name must be atleast 3 character long"],
        maxLength: [20, "Your firstname is up to 20 chars long."]
      },
      lastName: {
        type: String,
        required:[true, "Please enter your lastname "],
        trim: true,
        minlength:[3,"lastname must be atleast 3 character long"],
        maxLength: [20, "Your lastname is up to 20 chars long."]
      },
      email: {
        type: String,
        required:[true, "Please enter your email "],
        trim: true,
        unique: true,
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          'Please add a valid email'
      ]
        // validate:[isEmail, "please enter a valid email"]
      },
      password: {
        type: String,
        required:true,
        minlength:[6,"password must be atleast 6 character long"],
      },
      phone: {
        type: String,
        required:true,
        match: [ /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g," Please add a valid phone number "],
        minlength:[8,"phone must be atleast 8 character long"],
      },
      avatar: {
        type: String,
        default: 'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png'
      },
      
      
    }, {
      timestamps: true
    })

export default mongoose.model<IAdmin>('Admin', adminSchema)