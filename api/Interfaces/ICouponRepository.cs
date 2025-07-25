using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Interfaces
{
    public interface ICouponRepository
    {
        Task<List<Coupon>> GetAllAsync();
        Task<List<Coupon>> GetAllForUserAsync(string userId);
        Task<Coupon?> GetByIdAsync(int id);
        Task<Coupon> CreateAsync(Coupon couponModel);
        Task<Coupon?> DeleteAsync(int id);
        Task AddCouponToUserAsync(string userId, int couponId);
        Task RemoveCouponFromUserAsync(string userId, int couponId);
    }
}