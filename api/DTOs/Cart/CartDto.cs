using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.Product;

namespace api.DTOs.Cart
{
    public class CartDto
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public ProductCartDto? Product { get; set; }
    }
}