using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.Address;
using api.Models;

namespace api.Mappers
{
    public static class AddressMapper
    {
        public static AddressDto ToAddressDto(this Address addressModel)
        {
            return new AddressDto
            {
                Id = addressModel.Id,
                Name = addressModel.Name,
                Surname = addressModel.Surname,
                PhoneNumber = addressModel.PhoneNumber,
                City = addressModel.City,
                District = addressModel.District,
                Neighborhood = addressModel.Neighborhood,
                AddressDetail = addressModel.AddressDetail,
                AddressName = addressModel.AddressName,
                UserId = addressModel.UserId
            };
        }

        public static Address AddressCreateDto(this CreateAddressDto addressDto, string userId)
        {
            return new Address
            {
                Name = addressDto.Name,
                Surname = addressDto.Surname,
                PhoneNumber = addressDto.PhoneNumber,
                City = addressDto.City,
                District = addressDto.District,
                Neighborhood = addressDto.Neighborhood,
                AddressDetail = addressDto.AddressDetail,
                AddressName = addressDto.AddressName,
                UserId = userId
            };
        }

        public static Address AddressUpdateDto(this UpdateAddressDto addressDto)
        {
            return new Address
            {
                Name = addressDto.Name,
                Surname = addressDto.Surname,
                PhoneNumber = addressDto.PhoneNumber,
                City = addressDto.City,
                District = addressDto.District,
                Neighborhood = addressDto.Neighborhood,
                AddressDetail = addressDto.AddressDetail,
                AddressName = addressDto.AddressName
            };
        }
    }
}