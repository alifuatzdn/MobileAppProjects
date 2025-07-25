using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs.CreditCard
{
    public class UpdateCreditCardDto
    {
        public string? Name { get; set; }
        public string? CardNumber { get; set; }
        public string? CardHolderName { get; set; }
        public DateTime ValidationDate { get; set; }
        public int SecurityCode { get; set; }
    }
}