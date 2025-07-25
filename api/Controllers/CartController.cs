using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.Cart;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/cart")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly ICartRepository _cartRepo;
        public CartController(ICartRepository cartRepo)
        {
            _cartRepo = cartRepo;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAll()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userId = User.FindFirst("id")?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            var cartProducts = await _cartRepo.GetAllAsync(userId);
            var cartDtos = cartProducts.Select(c => c.ToCartDto()).ToList();
            return Ok(cartDtos);
        }

        [HttpGet("{productId:int}")]
        [Authorize]
        public async Task<IActionResult> GetById([FromRoute] int productId)
        {
            var userId = User.FindFirst("id")?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            var cartProduct = await _cartRepo.GetByIdAsync(productId, userId);
            if (cartProduct == null)
            {
                return NotFound("Product not found in the cart.");
            }

            return Ok(cartProduct.ToCartDto());
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create([FromBody] CreateCartDto cartDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userId = User.FindFirst("id")?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            var cartModel = new Cart
            {
                UserId = userId,
                ProductId = cartDto.ProductId,
                Quantity = 1
            };

            var updatedCart = await _cartRepo.CreateAsync(cartModel);

            return Ok(updatedCart.ToCartDto());
        }

        [HttpDelete("{productId:int}")]
        [Authorize]
        public async Task<IActionResult> Delete([FromRoute] int productId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userId = User.FindFirst("id")?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            var deletedCart = await _cartRepo.DeleteAsync(productId, userId);
            if (deletedCart == null)
            {
                return NotFound("Product not found in the cart.");
            }

            return Ok(deletedCart);
        }

        [HttpPut("{productId:int}")]
        [Authorize]
        public async Task<IActionResult> Update([FromRoute] int productId, [FromBody] UpdateCartDto updateCartDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userId = User.FindFirst("id")?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            var updatedCart = await _cartRepo.UpdateAsync(productId, userId, updateCartDto.NewQuantity);

            if (updatedCart == null)
            {
                return NotFound("Product not found in the cart.");
            }

            return Ok(updatedCart.ToCartDto());
        }
    }
}