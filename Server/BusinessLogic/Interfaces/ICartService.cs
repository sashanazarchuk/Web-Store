using Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Interfaces
{
    public interface ICartService
    {
        void AddToCart(int id);
        string GetCartId();
        IEnumerable<CartItem> GetCartItems();
        void RemoveItem(int productId);
        void ClearCart();
        decimal GetTotal();
    }
}