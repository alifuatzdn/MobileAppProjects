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
    public class FavoriteRepository : IFavoriteRepository
    {
        private readonly ApplicationDBContext _context;
        public FavoriteRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<Favorite> CreateAsync(Favorite favoriteModel)
        {
            await _context.Favorites.AddAsync(favoriteModel);
            await _context.SaveChangesAsync();
            return favoriteModel;
        }

        public async Task<Favorite?> DeleteAsync(int productId, string userId)
        {
            var favoriteItem = await _context.Favorites.FirstOrDefaultAsync(f => f.UserId == userId && f.ProductId == productId);

            if (favoriteItem == null)
            {
                return null;
            }

            _context.Favorites.Remove(favoriteItem);
            await _context.SaveChangesAsync();
            return favoriteItem;
        }

        public async Task<List<Favorite>> GetAllAsync(string userId)
        {
            return await _context.Favorites.Where(f => f.UserId == userId)
            .Include(f => f.Product).ToListAsync();
        }

        public async Task<Favorite?> GetByIdAsync(int productId, string userId)
        {
            return await _context.Favorites.Where(f => f.UserId == userId && f.ProductId == productId).Include(c => c.Product).FirstOrDefaultAsync();
        }
    }
}