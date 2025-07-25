using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs.Coupon
{
    public class CreateCouponDto
    {
        public string Name { get; set; } = string.Empty;
        public int Discount { get; set; }
        public int MinLimit { get; set; }
    }
}