import { useEffect, useState } from "react";
import { formatCurrency } from "../../utilities/formatCurrency";
import http from "../../http_common";
import { ICartItem } from "../ProductList/types";


const Cart = () => {
    const [cartItems, setCartItems] = useState<ICartItem[]>([]);
    const [total, setTotal] = useState<number>(0);

    const fetchCartItems = async () => {
        try {
            const response = await http.get("/api/Cart/GetAll");
            setCartItems(response.data);
        } catch (error) {
            console.error("Помилка при отриманні даних кошика:", error);
        }
    };

    useEffect(() => {
        
        fetchCartItems();
        fetchTotal();
    }, []);

   
    const removeFromCart = async (productID: number) => {
        try {
            await http.delete(`/api/Cart/Delete${productID}`);
           
            fetchCartItems();
            fetchTotal();
        } catch (error) {
            console.error(`Помилка при видаленні товару з кошика (ID: ${productID}):`, error);
        }
    };


    const clearCart = async () => {
        try {
            await http.delete(`/api/Cart/EmptyCart`)
            fetchCartItems();
            fetchTotal();
        } catch (error) {
            console.error("Помилка при очищенні кошика:", error);
        }
    };


    const fetchTotal = async () => {
        try {
            const response = await http.get("/api/Cart/GetTotal");
            setTotal(response.data);
        } catch (error) {
            console.error("Помилка при отриманні загальної суми кошика:", error);
        }
    }

    return (
        <div className="h-screen bg-gray-100 pt-20">
            <h1 className="mb-10 text-center text-2xl font-bold">Кошик</h1>
            <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                <div className="rounded-lg md:w-2/3">
                    {cartItems.map((item) => (
                        <div key={item.itemId} className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                            <img src={item.product.image} alt="product-image" className="w-full rounded-lg sm:w-40" />
                            <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                                <div className="mt-5 sm:mt-0">
                                    <h2 className="text-lg font-bold text-gray-900">{item.product.name}</h2>
                                    <p className="mt-1 text-xs text-gray-700">{item.product.description}</p>
                                </div>
                                <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                                    <div className="flex items-center border-gray-100">

                                        <p >{item.quantity}</p>

                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <p className="text-sm">{formatCurrency(item.product.price)}</p>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500" onClick={() => removeFromCart(item.product.productID)}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                    <div className="mb-2 flex justify-between">
                    </div>
                    <div className="flex justify-between">
                    </div>
                    <hr className="my-4" />
                    <div className="flex justify-between">
                        <p className="text-lg font-bold">Загальна сума</p>
                        <div>
                            <p className="mb-1 text-lg font-bold">{formatCurrency(total)}</p>
                        </div>
                    </div>
                    <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600" onClick={clearCart}>Очистити кошик</button>
                </div>
                
            </div>
        </div>
    );
};

export default Cart;