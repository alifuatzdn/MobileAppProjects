using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.Order;
using api.Models;

namespace api.Mappers
{
    public static class OrderMapper
    {
        public static OrderDto ToOrderDto(this Order order)
        {
            return new OrderDto
            {
                Id = order.Id,
                Products = order.Products.Select(p => p.ToProductDto()).ToList(),
                AddressId = order.AddressId,
                Address = order.Address?.ToAddressDto(),
                CreditCardId = order.CreditCardId,
                CreditCard = order.CreditCard?.ToCreditCardDto(),
                CreatedAt = order.CreatedAt,
                TotalPrice = order.TotalPrice
            };
        }

        public static Order OrderCreateDto(this CreateOrderDto orderDto)
        {
            return new Order
            {
                Products = orderDto.ProductIds.Select(id => new Product { Id = id }).ToList(),
                AddressId = orderDto.AddressId,
                CreditCardId = orderDto.CreditCardId,
                TotalPrice = orderDto.TotalPrice
            };
        }
    }
}