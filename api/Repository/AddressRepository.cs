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
    public class AddressRepository : IAddressRepository
    {
        private readonly ApplicationDBContext _context;
        public AddressRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<Address> CreateAsync(Address addressModel)
        {
            await _context.Addresses.AddAsync(addressModel);
            await _context.SaveChangesAsync();
            return addressModel;
        }

        public async Task<Address?> DeleteAsync(int id, string userId)
        {
            var addressModel = await _context.Addresses.FirstOrDefaultAsync(a => a.Id == id && a.UserId == userId);

            if (addressModel == null)
            {
                return null;
            }
            _context.Addresses.Remove(addressModel);
            await _context.SaveChangesAsync();
            return addressModel;
        }

        public async Task<List<Address>> GetAllAsync(string userId)
        {
            return await _context.Addresses.Where(a => a.UserId == userId).ToListAsync();
        }

        public async Task<Address?> GetByIdAsync(int id, string userId)
        {
            return await _context.Addresses.FirstOrDefaultAsync(a => a.Id == id && a.UserId == userId);
        }

        public async Task<Address?> UpdateAsync(int id, string userId, Address addressModel)
        {
            var existingAddress = await _context.Addresses.FirstOrDefaultAsync(a => a.Id == id && a.UserId == userId);

            if (existingAddress == null)
            {
                return null;
            }

            existingAddress.Name = addressModel.Name;
            existingAddress.Surname = addressModel.Surname;
            existingAddress.PhoneNumber = addressModel.PhoneNumber;
            existingAddress.City = addressModel.City;
            existingAddress.District = addressModel.District;
            existingAddress.Neighborhood = addressModel.Neighborhood;
            existingAddress.AddressDetail = addressModel.AddressDetail;
            existingAddress.AddressName = addressModel.AddressName;

            await _context.SaveChangesAsync();
            return existingAddress;
        }
    }
}