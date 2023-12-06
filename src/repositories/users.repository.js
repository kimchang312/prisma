import { prisma } from '../utils/prisma/index.js';

export class UsersRepository {
    findUser = async (me) => {
        const user = await prisma.users.findUnique({
            where: { id: +me.id },
          });
          return user;
    }
}