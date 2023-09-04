export interface IProduct{
    productID: number;
    name: string;
    description: string;
    image: string;
    price: number;
}

export interface ICartItem{
    ItemId:string;
    cartId:string;
    Quantity:number;
    ProductId:number;
    Product:IProduct
}