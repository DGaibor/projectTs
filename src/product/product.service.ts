import { PrismaClient } from '@prisma/client';
interface UpdateProductData {
    name?: string;
    description?: string;
    price?: number;
}
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
    
    async getAll() {
        try {
            return await this.prisma.product.findMany();
        }catch (e) {
            return 'Get Product Error';
        }
        
    }
    
    async update(id: number, data: UpdateProductData) {
        try{
            await this.prisma.product.update({
                where: {
                    id: id
                },
                data:data
            })
            return 'Product updated successfully';
        }catch (e) {
            return 'Product Update Error';
        }
    }
    

  
}
