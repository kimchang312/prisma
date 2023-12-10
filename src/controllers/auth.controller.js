import { AuthService } from '../services/auth.service.js';

export class AuthController{
    authService =new AuthService();

    signupUser=async(req,res,next)=>{
      
        try{
            const { email, password, passwordConfirm, name } = req.body;
        
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

        const signupedUser = await this.authService.signupUser(
            email,
            password,
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



singninUser=async(req,res,next)=>{
  try{
      const { email, password } = req.body;

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

       const accessToken = await this.authService.singninUser(
        email,
        password,
);

      if(!accessToken){
       return res.status(401).json({
          success:false,
          message:"일치하는 인증 정보가 없습니다.",
        })       
    }

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