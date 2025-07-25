using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.Product;

namespace api.DTOs.Favorite
{
    public class FavoriteDto
    {
        public int ProductId { get; set; }
        public ProductDto? Product { get; set; }
    }
}