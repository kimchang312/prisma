import { AuthRepository } from '../repositories/auth.repository.js';
import bcrypt from 'bcrypt';
import {
    PASSWORD_HASH_SALT_ROUNDS,
    JWT_ACCESS_TOKEN_SECRET,
    JWT_ACCESS_TOKEN_EXPIRES_IN,
  } from '../constants/security.costant.js';

export class AuthService {
    authRepository = new AuthRepository();

    signupUser=async( email,password,name,)=>{

         const hashedPassword = bcrypt.hashSync(password, PASSWORD_HASH_SALT_ROUNDS);
          
          const signupedUser=await this.authRepository.signupUser(
            email,
            password,
            hashedPassword,
            name,
          );
          
            if(!signupedUser){
              return false;
            }

            return {
             data: signupedUser
            };
    }

    singninUser=async(email, password)=>{
       
        const singninedUserToken= await this.authRepository.singninUser(
            email,
            password,
            JWT_ACCESS_TOKEN_SECRET,
            JWT_ACCESS_TOKEN_EXPIRES_IN,

        )

          if(!singninedUserToken){
            return false;
          }

    return {
      data: { singninedUserToken }
    };
      
    }


}