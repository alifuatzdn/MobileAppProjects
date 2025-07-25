using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Interfaces
{
    public interface IAddressRepository
    {
        Task<List<Address>> GetAllAsync(string userId);
        Task<Address?> GetByIdAsync(int id, string userId);
        Task<Address> CreateAsync(Address addressModel);
        Task<Address?> DeleteAsync(int id, string userId);
        Task<Address?> UpdateAsync(int id, string userId, Address addressModel);
    }
}