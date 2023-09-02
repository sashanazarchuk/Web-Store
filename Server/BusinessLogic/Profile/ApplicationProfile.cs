using BusinessLogic.DTOs;
using Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Profile
{
    public class ApplicationProfile:AutoMapper.Profile
    {
        public ApplicationProfile()
        {
            CreateMap<Product, ProductDto>();
            CreateMap<ProductDto, Product>();

        }
    }
}
