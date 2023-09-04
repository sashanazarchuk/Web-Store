import { useEffect, useState } from "react";
import http from "../../http_common";
import { ICartItem, IProduct } from "./types";
import { formatCurrency } from "../../utilities/formatCurrency";

const ProductList = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
  const [cartId, setCartId] = useState<ICartItem[]>([]);

  useEffect(() => {
    const fetchCartId = async () => {
      try {
        const response = await http.get("/api/Cart/GetCartId");
        const receivedCartId = response.data.cartId;
        setCartId(receivedCartId);
      } catch (error) {
        console.error("Помилка при отриманні ідентифікатора сесії корзини:", error);
      }
    };

    if (!cartId) {
      fetchCartId();
    }

  }, [cartId]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (cartId) {
          const response = await http.get("/api/Product/GetAll");
          setProducts(response.data);
        }
      } catch (error) {
        console.error("Помилка при отриманні продуктів:", error);
      }
    };

    if (cartId) {
      fetchProducts();
    }

  }, [cartId]);


  const addToCart = async (productID: number) => {
    try {
      if (cartId) {
        await http.post(`/api/Cart/AddToCart/${productID}`, { cartId });
        console.log(`Product ${productID} added to cart.`);
      } else {
        console.error("Ідентифікатор сесії не знайдено.");
      }
    } catch (error) {
      console.error("Помилка при виконанні запиту на додавання в кошик:", error);
    }
  };


  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.productID}>
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">{formatCurrency(product.price)}</p>
              <button
                onClick={() => addToCart(product.productID)}
                className="mt-2 bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 cursor-pointer"
              >
                Додати в кошик
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


export default ProductList;

