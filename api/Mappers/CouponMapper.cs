using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.Coupon;
using api.Models;

namespace api.Mappers
{
    public static class CouponMapper
    {
        public static CouponDto ToCouponDto(this Coupon coupon)
        {
            return new CouponDto
            {
                Id = coupon.Id,
                Name = coupon.Name,
                Discount = coupon.Discount,
                MinLimit = coupon.MinLimit
            };
        }

        public static Coupon CouponCreateDto(this CreateCouponDto couponDto)
        {
            return new Coupon
            {
                Name = couponDto.Name,
                Discount = couponDto.Discount,
                MinLimit = couponDto.MinLimit
            };
        }
    }
}