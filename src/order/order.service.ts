import { PrismaClient } from '@prisma/client';
import { Order, OrderItem } from './order.interface'
import { ProductService} from '../product/product.service';

export class OrderService {

    prisma: PrismaClient;
    productService: ProductService;
    
    constructor() {
        this.prisma = new PrismaClient();
        this.productService = new ProductService();
    }

    async create( order: Order ){
        try{
            const orderItem = order.products;
            //[{productId: 1, quantity: 50}, {productId: 2, quantity: 30}, {productId: 3, quantity: 20}]
            
            let newItems: OrderItem[] = [];
            
            for ( const item of orderItem ){
                const product = await this.productService.getProductById(item.productId)
                if (!product){
                    throw new Error(`CREATE_ORDER: Product with ID ${item.productId} not found`);
                }
                newItems.push({
                    productId: item.productId,
                    quantity: item.quantity,
                    price: product.price
                });
            }
            
            await this.prisma.order.create(
                {
                    data:{
                        description: order.description,
                        userId: order.userId,
                        items: {
                            create: newItems.map((item)=>({
                                productId: item.productId,
                                quantity: item.quantity,
                                price: (item.price) * item.quantity,
                            }))
                        },
                        totalPrice: newItems.reduce((total, item) => total + (item.price), 0),
                    }
                }
            )
            
            return  'Order created successfully';
            
            
        }catch (e){
            throw new Error('CREATE_ORDER: Could not create order');
        }
    }
}
