import { PrismaClient, Prisma } from '@prisma/client';
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
    
    async login(email:string,password:string) {
        try{
            const user = await this.getUserByEmail(email)

            if (user == null) {
                return 'User or Password invalid';
            }
            
            const checkPassword = await bcrypt.compare(password, user.password)
            
            if (!checkPassword ) {
                return 'User or Password invalid';
            }
   
            return 'User logged in successfully';
        }catch (e) {
        
            throw new Error('LOGIN_ERROR: Could not login user');
        }
        
    }
    
    async getUserByEmail(email:string){
        try{
            // return null or user
            return await this.prisma.user.findUnique({
                where: {
                    email: email
                }
            });
        }catch (e) {
            throw new Error('DATABASE_ERROR: Could not fetch user by email');
        }
    }
}
