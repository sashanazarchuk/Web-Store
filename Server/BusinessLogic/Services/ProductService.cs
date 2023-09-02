using AutoMapper;
using BusinessLogic.DTOs;
using BusinessLogic.Interfaces;
using Entities.Data;
using Entities.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Services
{
    public class ProductService : IProductService
    {
        private readonly AppDbContext context;
        private readonly IMapper mapper;

        public ProductService(AppDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }


        //A method to get a list of products
        public async Task<IEnumerable<ProductDto>> GetAllProduct()
        {
            // Got a list of products from the database
            var result = await context.Products.ToListAsync();

            //returning mapped product list
            return mapper.Map<IEnumerable<ProductDto>>(result);
        }
    }
}