using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Interfaces
{
    public interface ICreditCardRepository
    {
        Task<List<CreditCard>> GetAllAsync(string userId);
        Task<CreditCard?> GetByIdAsync(int id, string userId);
        Task<CreditCard> CreateAsync(CreditCard creditCardModel);
        Task<CreditCard?> DeleteAsync(int id, string userId);
        Task<CreditCard?> UpdateAsync(int id, string userId, CreditCard creditCardModel);
    }
}