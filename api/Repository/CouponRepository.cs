using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class CouponRepository : ICouponRepository
    {
        private readonly ApplicationDBContext _context;
        public CouponRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<Coupon> CreateAsync(Coupon couponModel)
        {
            await _context.Coupons.AddAsync(couponModel);
            await _context.SaveChangesAsync();
            return couponModel;
        }

        public async Task<Coupon?> DeleteAsync(int id)
        {
            var coupon = await _context.Coupons.FindAsync(id);
            if (coupon == null)
            {
                return null;
            }

            _context.Coupons.Remove(coupon);
            await _context.SaveChangesAsync();
            return coupon;
        }

        public async Task<List<Coupon>> GetAllAsync()
        {
            return await _context.Coupons.ToListAsync();
        }

        public async Task<List<Coupon>> GetAllForUserAsync(string userId)
        {
            return await _context.UserCoupons
              .Where(uc => uc.UserId == userId)
              .Select(uc => uc.Coupon!)
              .ToListAsync();
        }

        public async Task RemoveCouponFromUserAsync(string userId, int couponId)
        {
            var userCoupon = await _context.UserCoupons
                .FirstOrDefaultAsync(uc => uc.UserId == userId && uc.CouponId == couponId);

            if (userCoupon != null)
            {
                _context.UserCoupons.Remove(userCoupon);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<Coupon?> GetByIdAsync(int id)
        {
            return await _context.Coupons.FindAsync(id);
        }

        public async Task AddCouponToUserAsync(string userId, int couponId)
        {
            var userCoupon = new UserCoupon { UserId = userId, CouponId = couponId };
            await _context.UserCoupons.AddAsync(userCoupon);
            await _context.SaveChangesAsync();
        }
    }
}