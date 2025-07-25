using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Interfaces
{
    public interface ICartRepository
    {
        Task<List<Cart>> GetAllAsync(string userId);
        Task<Cart?> GetByIdAsync(int productId, string userId);
        Task<Cart> CreateAsync(Cart cartModel);
        Task<Cart?> DeleteAsync(int productId, string userId);
        Task<Cart?> UpdateAsync(int productId, string userId, int newQuantity);
    }
}