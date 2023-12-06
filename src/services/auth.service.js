import { AuthRepository } from '../repositories/auth.repository.js';
import bcrypt from 'bcrypt';
//import jwt from 'jsonwebtoken';
import {
    PASSWORD_HASH_SALT_ROUNDS,
    JWT_ACCESS_TOKEN_SECRET,
    JWT_ACCESS_TOKEN_EXPIRES_IN,
  } from '../constants/security.costant.js';

export class AuthService {
    authRepository = new AuthRepository();

    signupUser=async( email,password,passwordConfirm,name,)=>{
try{
        if (!email) {
            return res.status(400).json({
              success: false,
              message: '이메일 입력이 필요합니다.',
            });
          }
      
          if (!password) {
            return res.status(400).json({
              success: false,
              message: '비밀번호 입력이 필요합니다.',
            });
          }
      
          if (!passwordConfirm) {
            return res.status(400).json({
              success: false,
              message: '비밀번호 확인 입력이 필요합니다.',
            });
          }
      
          if (!name) {
            return res.status(400).json({
              success: false,
              message: '이름 입력이 필요합니다.',
            });
          }
      
          if (password !== passwordConfirm) {
            return res.status(400).json({
              success: false,
              message: '입력 한 비밀번호가 서로 일치하지 않습니다.',
            });
          }
      
          if (password.length < 6) {
            return res.status(400).json({
              success: false,
              message: '비밀번호는 최소 6자리 이상입니다.',
            });
          }
      
          let emailValidationRegex = new RegExp('[a-z0-9._]+@[a-z]+.[a-z]{2,3}');
          const isValidEmail = emailValidationRegex.test(email);
          if (!isValidEmail) {
            return res.status(400).json({
              success: false,
              message: '올바른 이메일 형식이 아닙니다.',
            });
          }

         const hashedPassword = bcrypt.hashSync(password, PASSWORD_HASH_SALT_ROUNDS);

          const signupedUser=await this.authRepository.signupUser(
            email,
            hashedPassword,
            name,
          );
          
            if(!signupedUser){
              return res.status(400).json({
                success: false,
                message: '이미 가입 된 이메일입니다.',
              });
            }

            return res.status(201).json({
                success: true,
             message: '회원가입에 성공했습니다.',
             data: signupedUser,
            });
        }catch(err){
        next(err);
        }
    }

    singninUser=async(email, password)=>{
        try{
            if (!email) {
                return res.status(400).json({
                  success: false,
                  message: '이메일 입력이 필요합니다.',
                });
              }
          
              if (!password) {
                return res.status(400).json({
                  success: false,
                  message: '비밀번호 입력이 필요합니다.',
                });
              }

        const singninedUserToken= await this.authRepository(
            email,
            password,
            JWT_ACCESS_TOKEN_SECRET,
            JWT_ACCESS_TOKEN_EXPIRES_IN,
        )
          if(!singninedUserToken){
            return res.status(401).json({
              success:false,
              message:"일치하는 인증 정보가 없습니다.",
            });
          }

    return res.status(200).json({
      success: true,
      message: '로그인에 성공했습니다.',
      data: { singninedUserToken },
    });
        }catch(err){
            next(err);
        }
    }


}