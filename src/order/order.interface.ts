 interface productItem{
    productId: number,
    quantity: number,
}

export interface OrderItem extends productItem{
    price: number
 }

export interface Order{
    products:productItem[],
    userId:number,
    description: string
}
