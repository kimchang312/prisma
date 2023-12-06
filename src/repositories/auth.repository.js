import { prisma } from '../utils/prisma/index.js';
import jwt from 'jsonwebtoken';
import bcrpt from "bcrypt";

export class AuthRepository{

    signupUser=async( email,hashedPassword,name)=>{
        const userEmail= await prisma.users.findFirst({
            where:{email:email},
        });

        if(userEmail){
            return false;
        }

        const newUser= await prisma.users.create({
            data:{
                email,
                hashedPassword,
                name,
            },
        });

        return newUser;
    }

    singninUser=async( email,password,JWT_ACCESS_TOKEN_SECRET,JWT_ACCESS_TOKEN_EXPIRES_IN,)=>{
        const user= await prisma.users.findFirst({
            where:{email:email},
        });
       const result= await bcrpt.compareSync(password, user.hashedPassword)
       if(!result){
        return false;
       }

       const accessToken=jwt.sign({id:user.id},JWT_ACCESS_TOKEN_SECRET,{
        expiresIn: JWT_ACCESS_TOKEN_EXPIRES_IN,
       });
       return accessToken;
    }
    

}
