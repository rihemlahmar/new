import mongoose from 'mongoose'
import {Inotification} from '../interfaces/INotification'

const notificationSchema = new mongoose.Schema({

  title: {
        type: String,
        required:[true, "Please enter notification title"],
        trim: true,
      },
  description: {
        type: String,
        required:[true, "Please enter the  notification description "],
        
      },
      type : {
        type: String,
        required:[true, "Please enter a notification type"],
        enum:['success','info','warning','danger']
        
      },
      sendingDate: {
        type: Date,
        required:[true, "Please enter  sendingDate"],
        
      },
      listOfCompany:[String]
      
      
    }, {
      timestamps: true
    })
  export default mongoose.model<Inotification>('Notifications', notificationSchema)