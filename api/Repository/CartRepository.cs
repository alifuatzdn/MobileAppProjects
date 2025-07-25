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
    public class CartRepository : ICartRepository
    {

        private readonly ApplicationDBContext _context;
        public CartRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<Cart> CreateAsync(Cart cartModel)
        {
            var existingCartItem = await _context.Carts.FirstOrDefaultAsync(c => c.UserId == cartModel.UserId && c.ProductId == cartModel.ProductId);

            if (existingCartItem != null)
            {
                existingCartItem.Quantity += 1;
                _context.Carts.Update(existingCartItem);
            }
            else
            {
                await _context.Carts.AddAsync(cartModel);
            }

            await _context.SaveChangesAsync();
            return existingCartItem ?? cartModel;
        }

        public async Task<Cart?> DeleteAsync(int productId, string userId)
        {
            var cartItem = await _context.Carts.FirstOrDefaultAsync(c => c.UserId == userId && c.ProductId == productId);

            if (cartItem == null)
            {
                return null;
            }

            _context.Carts.Remove(cartItem);
            await _context.SaveChangesAsync();
            return cartItem;
        }

        public async Task<List<Cart>> GetAllAsync(string userId)
        {
            return await _context.Carts.Where(c => c.UserId == userId)
            .Include(c => c.Product).ToListAsync();
        }

        public async Task<Cart?> GetByIdAsync(int productId, string userId)
        {
            return await _context.Carts.Where(c => c.UserId == userId && c.ProductId == productId).Include(c => c.Product).FirstOrDefaultAsync();
        }

        public async Task<Cart?> UpdateAsync(int productId, string userId, int newQuantity)
        {
            var cartItem = await _context.Carts.FirstOrDefaultAsync(c => c.UserId == userId && c.ProductId == productId);

            if (cartItem == null)
            {
                return null;
            }

            if (newQuantity == 0)
            {
                _context.Carts.Remove(cartItem);
            }

            else
            {
                cartItem.Quantity = newQuantity;
                _context.Carts.Update(cartItem);
            }

            await _context.SaveChangesAsync();
            return cartItem;
        }
    }
}