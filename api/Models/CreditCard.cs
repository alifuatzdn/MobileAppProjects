using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class CreditCard
    {
        public string? Name { get; set; }
        public int Id { get; set; }
        public string? CardNumber { get; set; }
        public string? CardHolderName { get; set; }
        public DateTime ValidationDate { get; set; }
        public int SecurityCode { get; set; }
        public string? UserId { get; set; }
        public User? User { get; set; }
    }
}