using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.Account;
using api.DTOs.Address;
using api.DTOs.CreditCard;
using api.DTOs.Product;

namespace api.DTOs.Order
{
    public class OrderDto
    {
        public int Id { get; set; }
        public ICollection<ProductDto> Products { get; set; } = new List<ProductDto>();
        public int AddressId { get; set; }
        public AddressDto? Address { get; set; }
        public int CreditCardId { get; set; }
        public CreditCardDto? CreditCard { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public decimal TotalPrice { get; set; }
    }
}
