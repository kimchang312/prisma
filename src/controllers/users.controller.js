import { UsersService } from '../services/users.service.js';

export class UsersController{
    usersService= new UsersService();

    getUser=async(req,res,next)=>{
        try{
            const me = res.local.user;
            const user =await this.usersService.findUser(me);
            return res.status(200).json({
              success: true,
              message: '내 정보 조회에 성공했습니다.',
              data: user,
            });
        } catch (err) {
      next(err);
    }
        
    }
}