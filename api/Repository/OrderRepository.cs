using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
  public class OrderRepository : IOrderRepository
  {
    private readonly ApplicationDBContext _context;
    public OrderRepository(ApplicationDBContext context)
    {
      _context = context;
    }
    public async Task<Order> CreateAsync(Order orderModel)
    {
      await _context.Orders.AddAsync(orderModel);
      await _context.SaveChangesAsync();
      return orderModel;
    }

    public async Task<Order?> DeleteAsync(int orderId, string userId)
    {
      var order = await _context.Orders.FirstOrDefaultAsync(o => o.UserId == userId && o.Id == orderId);

      if (order == null)
      {
        return null;
      }

      _context.Orders.Remove(order);
      await _context.SaveChangesAsync();
      return order;
    }

    public async Task<List<Order>> GetAllAsync(string userId)
    {
      return await _context.Orders
          .Where(o => o.UserId == userId)
          .Include(o => o.Products)
          .Include(o => o.Address)
          .Include(o => o.CreditCard)
          .ToListAsync();
    }

    public async Task<Order?> GetByIdAsync(int orderId, string userId)
    {
      return await _context.Orders
          .Where(o => o.UserId == userId && o.Id == orderId)
          .Include(o => o.Products)
          .Include(o => o.Address)
          .Include(o => o.CreditCard)
          .FirstOrDefaultAsync();
    }
  }
}