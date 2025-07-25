using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.Order;
using api.Helpers;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/order")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderRepository _orderRepo;
        private readonly IProductRepository _productRepo;
        public OrderController(IOrderRepository orderRepo, IProductRepository productRepo)
        {
            _productRepo = productRepo;
            _orderRepo = orderRepo;
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

            var orders = await _orderRepo.GetAllAsync(userId);
            var orderDtos = orders.Select(o => o.ToOrderDto()).ToList();
            return Ok(orderDtos);
        }

        [HttpGet("{id:int}")]
        [Authorize]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var userId = User.FindFirst("id")?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            var order = await _orderRepo.GetByIdAsync(id, userId);
            if (order == null)
            {
                return NotFound("Order not found.");
            }

            return Ok(order.ToOrderDto());
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create([FromBody] CreateOrderDto orderDto)
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

            // Veritabanından Product nesnelerini al
            var products = await _productRepo.GetAllAsync(new QueryObject
            {
                // ProductIds'e göre filtreleme
                ProductIds = orderDto.ProductIds
            });

            // Gelen ProductIds ile veritabanındaki ürünlerin sayısını karşılaştır
            if (products.Count != orderDto.ProductIds.Count)
            {
                return BadRequest("One or more ProductIds are invalid.");
            }

            var orderModel = new Order
            {
                UserId = userId,
                Products = products.ToList(), // Eşleşen ürünler siparişe ekleniyor
                AddressId = orderDto.AddressId,
                CreditCardId = orderDto.CreditCardId,
                CreatedAt = DateTime.UtcNow,
                TotalPrice = orderDto.TotalPrice,
            };

            var createdOrder = await _orderRepo.CreateAsync(orderModel);

            return Ok(createdOrder.ToOrderDto());
        }

        [HttpDelete("{id:int}")]
        [Authorize]
        public async Task<IActionResult> Delete([FromRoute] int id)
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

            var deletedOrder = await _orderRepo.DeleteAsync(id, userId);
            if (deletedOrder == null)
            {
                return NotFound("Order not found.");
            }

            return Ok(deletedOrder);
        }
    }
}