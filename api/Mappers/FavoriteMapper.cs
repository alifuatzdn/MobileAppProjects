using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.Favorite;
using api.Models;

namespace api.Mappers
{
    public static class FavoriteMapper
    {
        public static FavoriteDto ToFavoriteDto(this Favorite favorite)
        {
            return new FavoriteDto
            {
                ProductId = favorite.ProductId,
                Product = favorite.Product?.ToProductDto()
            };
        }

        public static Favorite ToCart(this CreateFavoriteDto favoriteDto, string userId)
        {
            return new Favorite
            {
                UserId = userId,
                ProductId = favoriteDto.ProductId,
            };
        }
    }
}