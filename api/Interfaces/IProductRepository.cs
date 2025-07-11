using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.Product;
using api.Helpers;
using api.Models;

namespace api.Interfaces
{
    public interface IProductRepository
    {
        Task<List<Product>> GetAllAsync(QueryObject query);
        Task<Product?> GetByIdAsync(int id);
        Task<Product> CreateAsync(Product productModel);
        Task<Product?> UpdateAsync(int id, UpdateProductRequestDto productDto);
        Task<Product?> DeleteAsync(int id);
        Task<bool> ProductExists(int id);
    }
}