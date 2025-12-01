import { PrismaClient } from '@prisma/client';

export class ProductService {

    prisma : PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async create(name: string, description: string, price: number) {
        try{
            await this.prisma.product.create({
                data:{
                    name: name,
                    description: description,
                    price: price,
                }
            })
            return 'Product created successfully';
        }catch (e) {
            return 'Product Error';
        }
    }
    

  
}
