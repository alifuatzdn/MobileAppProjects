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
    public class CreditCardRepository : ICreditCardRepository
    {
        private readonly ApplicationDBContext _context;
        public CreditCardRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<CreditCard> CreateAsync(CreditCard creditCardModel)
        {
            await _context.AddAsync(creditCardModel);
            await _context.SaveChangesAsync();
            return creditCardModel;
        }

        public async Task<CreditCard?> DeleteAsync(int id, string userId)
        {
            var creditCardModel = await _context.CreditCards.FirstOrDefaultAsync(a => a.Id == id && a.UserId == userId);

            if (creditCardModel == null)
            {
                return null;
            }
            _context.CreditCards.Remove(creditCardModel);
            await _context.SaveChangesAsync();
            return creditCardModel;
        }

        public async Task<List<CreditCard>> GetAllAsync(string userId)
        {
            return await _context.CreditCards.Where(a => a.UserId == userId).ToListAsync();
        }

        public async Task<CreditCard?> GetByIdAsync(int id, string userId)
        {
            return await _context.CreditCards.FirstOrDefaultAsync(a => a.Id == id && a.UserId == userId);
        }

        public async Task<CreditCard?> UpdateAsync(int id, string userId, CreditCard creditCardModel)
        {
            var existingCreditCard = await _context.CreditCards.FirstOrDefaultAsync(a => a.Id == id && a.UserId == userId);

            if (existingCreditCard == null)
            {
                return null;
            }

            existingCreditCard.Name = creditCardModel.Name;
            existingCreditCard.CardNumber = creditCardModel.CardNumber;
            existingCreditCard.CardHolderName = creditCardModel.CardHolderName;
            existingCreditCard.ValidationDate = creditCardModel.ValidationDate;
            existingCreditCard.SecurityCode = creditCardModel.SecurityCode;

            await _context.SaveChangesAsync();
            return existingCreditCard;
        }
    }
}