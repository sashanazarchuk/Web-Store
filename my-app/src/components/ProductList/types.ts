export interface IProduct{
    productID: number;
    name: string;
    description: string;
    image: string;
    price: number;
}

export interface ICartItem{
    itemId:string;
    cartId:string;
    quantity:number;
    productId:number;
    product:IProduct
}