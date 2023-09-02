using BusinessLogic.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService service;
        public ProductController(IProductService service)
        {
            this.service = service;
        }


        //A method to get a list of products
        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAllProduct()
        {
            try
            {
                //Got product from service and return product list
                var result = await service.GetAllProduct();
                return Ok(result);

            }
            catch (Exception ex)
            {
                //Returning Bad Request with an error message
                string errorMessage = "An error occurred while receiving the products " + ex.Message;
                return BadRequest(errorMessage);
            }
        }
    }
}
