using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class ApplicationDBContext : IdentityDbContext<User>
    {
        public ApplicationDBContext(DbContextOptions dbContextOptions)
        : base(dbContextOptions) { }

        public DbSet<Product> Products { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Favorite> Favorites { get; set; }
        public DbSet<Address> Addresses { get; set; }
        public DbSet<CreditCard> CreditCards { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Cart> Carts { get; set; }
        public DbSet<Coupon> Coupons { get; set; }
        public DbSet<UserCoupon> UserCoupons { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Address>()
                .HasOne(a => a.User)
                .WithMany(u => u.Addresses)
                .HasForeignKey(a => a.UserId);

            builder.Entity<CreditCard>()
                .HasOne(a => a.User)
                .WithMany(u => u.CreditCards)
                .HasForeignKey(a => a.UserId);

            builder.Entity<Order>()
                .HasOne(a => a.User)
                .WithMany(u => u.Orders)
                .HasForeignKey(a => a.UserId);

            builder.Entity<Favorite>(x => x.HasKey(f => new { f.UserId, f.ProductId }));

            builder.Entity<Favorite>()
            .HasOne(u => u.User)
            .WithMany(u => u.Favorites)
            .HasForeignKey(u => u.UserId);

            builder.Entity<Cart>(x => x.HasKey(f => new { f.UserId, f.ProductId }));

            builder.Entity<Cart>()
            .HasOne(u => u.User)
            .WithMany(u => u.Carts)
            .HasForeignKey(u => u.UserId);

            builder.Entity<UserCoupon>().HasKey(uc => new { uc.UserId, uc.CouponId });

            builder.Entity<UserCoupon>()
                .HasOne(uc => uc.User)
                .WithMany(u => u.UserCoupons)
                .HasForeignKey(uc => uc.UserId);

            builder.Entity<UserCoupon>()
                .HasOne(uc => uc.Coupon)
                .WithMany(c => c.UserCoupons)
                .HasForeignKey(uc => uc.CouponId);

            List<IdentityRole> roles = new List<IdentityRole>
            {
                new IdentityRole {
                Name = "Admin",
                NormalizedName = "ADMIN"
                },
                new IdentityRole {
                Name = "User",
                NormalizedName = "USER"
                },
            };
            builder.Entity<IdentityRole>().HasData(roles);
        }
    }
}