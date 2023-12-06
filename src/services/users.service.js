import { UsersRepository } from '../repositories/users.repository.js';


export class UsersService {
    usersRepository = new UsersRepository();

    findUser =async(me)=>{
        const user = await this.usersRepository.findUser(me);
        return {
            email :user.email,
            name : user.name,
        }
    };
}
