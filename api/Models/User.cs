using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace api.Models
{
    public class User : IdentityUser
    {
        public string? Name { get; set; }
        public string? Surname { get; set; }
        public DateTime? BirthDate { get; set; }
        public List<Favorite> Favorites { get; set; } = new List<Favorite>();
        public List<Cart> Carts { get; set; } = new List<Cart>();
        public List<Comment> Comments { get; set; } = new List<Comment>();
        public List<Order> Orders { get; set; } = new List<Order>();
        public List<Address> Addresses { get; set; } = new List<Address>();
        public List<CreditCard> CreditCards { get; set; } = new List<CreditCard>();
        public ICollection<UserCoupon> UserCoupons { get; set; } = new List<UserCoupon>();
    }
}