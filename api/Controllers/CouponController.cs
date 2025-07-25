using api.DTOs.Coupon;
using api.Interfaces;
using api.Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[Route("api/coupon")]
[ApiController]
public class CouponController : ControllerBase
{
    private readonly ICouponRepository _couponRepo;
    public CouponController(ICouponRepository couponRepo)
    {
        _couponRepo = couponRepo;
    }

    [HttpGet("user")]
    [Authorize]
    public async Task<IActionResult> GetAllForUser()
    {
        var userId = User.FindFirst("id")?.Value;
        if (string.IsNullOrEmpty(userId))
            return Unauthorized();

        var coupons = await _couponRepo.GetAllForUserAsync(userId);
        var couponDtos = coupons.Select(c => c.ToCouponDto()).ToList();
        return Ok(couponDtos);
    }

    [HttpDelete("user/{couponId:int}")]
    [Authorize]
    public async Task<IActionResult> RemoveCouponFromUser(int couponId)
    {
        var userId = User.FindFirst("id")?.Value;
        if (string.IsNullOrEmpty(userId))
            return Unauthorized();

        await _couponRepo.RemoveCouponFromUserAsync(userId, couponId);
        return NoContent();
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateCouponDto couponDto)
    {
        var coupon = couponDto.CouponCreateDto();
        await _couponRepo.CreateAsync(coupon);
        return Ok(coupon.ToCouponDto());
    }

    [HttpPost("assign/{couponId}")]
    [Authorize]
    public async Task<IActionResult> AssignCouponToUser(int couponId)
    {
        var userId = User.FindFirst("id")?.Value;
        if (string.IsNullOrEmpty(userId))
            return Unauthorized();

        await _couponRepo.AddCouponToUserAsync(userId, couponId);
        return Ok();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _couponRepo.DeleteAsync(id);
        return NoContent();
    }
}