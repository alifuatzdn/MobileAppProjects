using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Order
    {
        public int Id { get; set; }
        public string UserId { get; set; } = string.Empty;
        public User? User { get; set; }
        public ICollection<Product> Products { get; set; } = new List<Product>();
        public int AddressId { get; set; }
        public Address? Address { get; set; }
        public int CreditCardId { get; set; }
        public CreditCard? CreditCard { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public decimal TotalPrice { get; set; }
    }
}