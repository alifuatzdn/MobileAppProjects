using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Coupon
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int Discount { get; set; }
        public int MinLimit { get; set; }
        public List<UserCoupon> UserCoupons { get; set; } = new();
    }
}