using BusinessLogic.Interfaces;
using Entities.Data;
using Entities.Models;
using Microsoft.EntityFrameworkCore;
using System.Text;


namespace BusinessLogic.Services
{
    public class CartService : ICartService
    {
        private readonly AppDbContext context;
        private readonly IHttpContextAccessor httpContext;


        public const string CartSessionKey = "CartId";
        public string ShoppingCartId { get; set; }

        public CartService(AppDbContext context, IHttpContextAccessor httpContext)
        {
            this.context = context;
            this.httpContext = httpContext;
        }

        //Method add product to cart 
        public void AddToCart(int id)
        {
            ShoppingCartId = GetCartId();

            var cartItem = context.CartItem.SingleOrDefault(c => c.CartId == ShoppingCartId && c.ProductId == id);
            if (cartItem == null)
            {
                cartItem = new CartItem
                {
                    ItemId = Guid.NewGuid().ToString(),
                    ProductId = id,
                    CartId = ShoppingCartId,
                    Product = context.Products.SingleOrDefault(
                    p => p.ProductID == id),
                    Quantity = 1
                };
                context.CartItem.Add(cartItem);
            }
            else
            {
                cartItem.Quantity++;
            }
            context.SaveChanges();
        }

        //Method to get the unique ID of the user's shopping cart
        public string GetCartId()
        {
            if (httpContext.HttpContext.Session.GetString(CartSessionKey) == null)
            {
                if (!string.IsNullOrWhiteSpace(httpContext.HttpContext.User.Identity.Name))
                {
                    httpContext.HttpContext.Session.SetString(CartSessionKey, httpContext.HttpContext.User.Identity.Name);
                }
                else
                {
                    Guid tempCartId = Guid.NewGuid();
                    httpContext.HttpContext.Session.SetString(CartSessionKey, tempCartId.ToString());
                }
            }
            return httpContext.HttpContext.Session.GetString(CartSessionKey);
        }

        //Method to show cart product list
        public IEnumerable<CartItem> GetCartItems()
        {
            ShoppingCartId = GetCartId();

            return context.CartItem.Include(c=>c.Product).Where(c => c.CartId == ShoppingCartId).ToList();
        }

        //Method to delete current product from cart
        public void RemoveItem(int productId)
        {
            ShoppingCartId = GetCartId();

            var cartItem = context.CartItem.SingleOrDefault(c => c.CartId == ShoppingCartId && c.ProductId == productId);

            if (cartItem != null)
            {
                context.CartItem.Remove(cartItem);
                context.SaveChanges();
            }
        }

        //Method delete all product from the cart
        public void ClearCart()
        {
            ShoppingCartId = GetCartId();

            var cartItems = context.CartItem
                .Where(cart => cart.CartId == ShoppingCartId);

            context.CartItem.RemoveRange(cartItems);
            context.SaveChanges();
        }

        // Method to get total amount of products in the cart
        public decimal GetTotal()
        {
            ShoppingCartId = GetCartId();

            decimal total = context.CartItem
                .Where(cart => cart.CartId == ShoppingCartId)
                .Sum(cart => cart.Quantity * cart.Product.Price);

            return total;
        }
    }
}