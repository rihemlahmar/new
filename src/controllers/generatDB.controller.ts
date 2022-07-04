import { Request, Response } from 'express'
import {MongoClient} from 'mongodb'
import { IReqAuth } from '../interfaces/IAdmin';


export async function generateRecruiterDB(req: IReqAuth, res: Response) {
const url = process.env.MONGODB_URL 
const client = new MongoClient(`${url}`);
const {matricule}=req.body
const dbname="Djubatuser_"+matricule
    try {
        client.connect  ((err: any)=> {
            const db=client.db(dbname);
            const allCollections = ['Company','Recruiters','Posts','Tests','Series','Questions','Applies','Responses','Rankings','validation Interview Details'].map(name => db.createCollection(name))
            // db.collection("Recruiters").insertMany([
            //     {firstName:"Dhaouadi",
            //     lastName:"dalila",
            //     email:"riden5211@gmail.com",
            //     password:"0123456789",
            //     phone:"+21695793875",
            //     companyId:"627a3b1196a052d1ec81f322"}
            // ]).then(function(){
            //     console.log("Data inserted")  // Success
            // }).catch(function(error){
            //     console.log(error)      // Failure
            // });
    } )
    return res.status(200).json({succes: true , messages:' new DB created succesfuly' , data : { "dataBaseName":dbname}})
}catch (error:any) {
        return res.status(500).json({success: false,message: error.message,data:""})
    }
}