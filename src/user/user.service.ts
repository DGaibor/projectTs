import { PrismaClient } from '@prisma/client';
import bcrypt from "bcrypt";


export class UserService {
    prisma : PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async create(name: string, email: string, password: string) {
        try{

            const newPassword = await bcrypt.hash(password,10)
            
            await this.prisma.user.create({
                data: {
                    name: name,
                    email: email,
                    password: newPassword,

                }
            })
            return 'User created successfully';
        }catch (e) {
            return 'User Error';
        }
    }
}
