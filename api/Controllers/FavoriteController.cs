using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.Favorite;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/favorites")]
    public class FavoriteController : ControllerBase
    {
        private readonly IFavoriteRepository _favoriteRepo;
        public FavoriteController(IFavoriteRepository favoriteRepo)
        {
            _favoriteRepo = favoriteRepo;
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

            var favoriteProducts = await _favoriteRepo.GetAllAsync(userId);
            var favoriteDtos = favoriteProducts.Select(c => c.ToFavoriteDto()).ToList();
            return Ok(favoriteDtos);
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

            var favoriteProduct = await _favoriteRepo.GetByIdAsync(productId, userId);
            if (favoriteProduct == null)
            {
                return NotFound("Product not found in the favorites.");
            }

            return Ok(favoriteProduct.ToFavoriteDto());
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create([FromBody] CreateFavoriteDto favoriteDto)
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

            var favoriteModel = new Favorite
            {
                UserId = userId,
                ProductId = favoriteDto.ProductId
            };

            var updatedFavorite = await _favoriteRepo.CreateAsync(favoriteModel);

            return Ok(updatedFavorite.ToFavoriteDto());
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

            var deletedFavorite = await _favoriteRepo.DeleteAsync(productId, userId);
            if (deletedFavorite == null)
            {
                return NotFound("Product not found in the favorites.");
            }

            return Ok(deletedFavorite);
        }
    }
}