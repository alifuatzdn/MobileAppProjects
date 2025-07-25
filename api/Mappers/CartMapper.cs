using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.Cart;
using api.DTOs.Product;
using api.Models;

namespace api.Mappers
{
    public static class CartMapper
    {
        public static CartDto ToCartDto(this Cart cart)
        {
            return new CartDto
            {
                ProductId = cart.ProductId,
                Quantity = cart.Quantity,
                Product = cart.Product?.ToProductCartDto()
            };
        }

        public static Cart ToCart(this CreateCartDto cartDto, string userId)
        {
            return new Cart
            {
                UserId = userId,
                ProductId = cartDto.ProductId,
            };
        }

        public static Cart UpdateCart(this Cart cart, int newQuantity)
        {
            cart.Quantity = newQuantity;
            return cart;
        }
    }
}