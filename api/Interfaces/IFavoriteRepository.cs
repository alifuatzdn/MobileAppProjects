using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Interfaces
{
    public interface IFavoriteRepository
    {
        Task<List<Favorite>> GetAllAsync(string userId);
        Task<Favorite?> GetByIdAsync(int productId, string userId);
        Task<Favorite> CreateAsync(Favorite favoriteModel);
        Task<Favorite?> DeleteAsync(int productId, string userId);
    }
}