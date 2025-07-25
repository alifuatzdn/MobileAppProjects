using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Interfaces
{
    public interface ICommentRepository
    {
        Task<bool> UserHasCommentForProductAsync(string userId, int productId);
        Task<List<Comment>> GetAllAsync();
        Task<List<Comment>> GetAllForUserAsync(string userId);
        Task<Comment?> GetByIdAsync(int id);
        Task<Comment> CreateAsync(Comment commentModel);
        Task<Comment?> DeleteAsync(int id, string userId);
        Task<Comment?> UpdateAsync(int id, string userId, Comment commentModel);
    }
}