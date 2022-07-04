import UserModel from "../models/admin.model"

export async function updateUser(filter:any,update:any){
     try{
         return await UserModel.findOneAndUpdate(filter,update)
     } catch(e:any){
        throw new Error(e)
     }
}

export async function findUser(filter:any){
    try{
        return await UserModel.findOne(filter)
    } catch(e:any){
       throw new Error(e)
    }
}

export async function findUserById(id:any){
    try{
        return await UserModel.findById(id)
    } catch(e:any){
       throw new Error(e)
    }
}

export async function updateUserInfosService(id: string, data: any) {
    try {
      return await UserModel.findOneAndUpdate({ _id: id }, data, { new: true });
    } catch (e: any) {
      throw new Error(e);
    }
  }

  export async function getUserInfosService(_id: string) {
    try {
      return await UserModel.findOne({ _id });
    } catch (e: any) {
      throw new Error(e);
    }
  }