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
    public class CreateOrderDto
    {
        public ICollection<int> ProductIds { get; set; } = new List<int>();
        public int AddressId { get; set; }
        public int CreditCardId { get; set; } 
        public decimal TotalPrice { get; set; }
    }
}