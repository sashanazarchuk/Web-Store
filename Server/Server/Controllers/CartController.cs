using BusinessLogic.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly ICartService service;

        public CartController(ICartService service)
        {
            this.service = service;
        }


        [HttpPost("AddToCart{id}")]
        public IActionResult AddToCart([FromRoute] int id)
        {
            try
            {
                service.AddToCart(id);
                return Ok();
            }
            catch (Exception)
            {
                string errorMessage = "Error adding product to cart";
                return BadRequest(errorMessage);
            }
        }


        [HttpGet("GetAll")]
        public IActionResult GetAll()
        {
            try
            {
                return Ok(service.GetCartItems());

            }
            catch (Exception)
            {
                string errorMessage = "Error retrieving product list";
                return BadRequest(errorMessage);
            }
        }


        [HttpDelete("Delete{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                service.RemoveItem(id);
                return Ok();
            }
            catch (Exception)
            {
                string errorMessage = "Error during remove item from the cart";
                return BadRequest(errorMessage);
            }
        }


        [HttpDelete("EmptyCart")]
        public IActionResult EmptyCart()
        {
            try
            {
                service.ClearCart();
                return Ok();
            }
            catch (Exception)
            {
                string errorMessage = "Error during clear cart";
                return BadRequest(errorMessage);
            }
        }



        [HttpGet("GetCartId")]
        public IActionResult GetCartId()
        {
            try
            {
                return Ok(service.GetCartId());
            }
            catch (Exception)
            {
                string errorMessage = "Error during show CartId";
                return BadRequest(errorMessage);
            }
        }



        [HttpGet("GetTotal")]
        public IActionResult GetTotal()
        {
            try
            {
                return Ok(service.GetTotal());
            }
            catch (Exception)
            {
                string errorMessage = "Error during show total price products in the cart";
                return BadRequest(errorMessage);
            }
        }
    }
}