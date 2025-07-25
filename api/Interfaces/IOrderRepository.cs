using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Interfaces
{
    public interface IOrderRepository
    {
        Task<List<Order>> GetAllAsync(string userId);
        Task<Order?> GetByIdAsync(int orderId, string userId);
        Task<Order> CreateAsync(Order orderModel);
        Task<Order?> DeleteAsync(int orderId, string userId);
    }
}