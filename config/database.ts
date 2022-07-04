const mongoose = require('mongoose');

const URI = process.env.MONGODB_URL 


mongoose.connect(`${URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, function (err: any): void {
        if (err)
            throw err;
        console.log('Mongodb Connected Succsesfully...');
    })