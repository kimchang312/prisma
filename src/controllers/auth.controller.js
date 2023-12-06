import { AuthService } from '../services/auth.service.js';

export class AuthController{
    authService =new AuthService();

    signupUser=async(req,res,next)=>{
        try{
            const { email, password, passwordConfirm, name } = req.body;
            
        const signupedUser = await this.authService.signupUser(
            email,
            password,
            passwordConfirm,
            name,
          );

          return res.status(201).json({
            success: true,
            message: '회원가입에 성공했습니다.',
            data: signupedUser,
          });
        }catch(err){
            next(err);
        }
}

singninUser=async(req,res,next)=>{
  try{
      const { email, password } = req.body;

       const accessToken = await this.authService.singninUser(
        email,
  password,
);

return res.status(200).json({
  success: true,
  message: '로그인에 성공했습니다.',
  data: { accessToken },
});
  }catch(err){
      next(err);
  }
}

}