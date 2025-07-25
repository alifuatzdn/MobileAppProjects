using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.CreditCard;
using api.Models;

namespace api.Mappers
{
    public static class CreditCardMapper
    {
        public static CreditCardDto ToCreditCardDto(this CreditCard creditCardModel)
        {
            return new CreditCardDto
            {
                Id = creditCardModel.Id,
                Name = creditCardModel.Name,
                CardNumber = creditCardModel.CardNumber,
                CardHolderName = creditCardModel.CardHolderName,
                ValidationDate = creditCardModel.ValidationDate,
                SecurityCode = creditCardModel.SecurityCode,
                UserId = creditCardModel.UserId
            };
        }

        public static CreditCard CreditCardCreateDto(this CreateCreditCardDto creditCardDto, string userId)
        {
            return new CreditCard
            {
                Name = creditCardDto.Name,
                CardNumber = creditCardDto.CardNumber,
                CardHolderName = creditCardDto.CardHolderName,
                ValidationDate = creditCardDto.ValidationDate,
                SecurityCode = creditCardDto.SecurityCode,
                UserId = userId
            };
        }

        public static CreditCard CreditCardUpdateDto(this UpdateCreditCardDto creditCardDto)
        {
            return new CreditCard
            {
                Name = creditCardDto.Name,
                CardNumber = creditCardDto.CardNumber,
                CardHolderName = creditCardDto.CardHolderName,
                ValidationDate = creditCardDto.ValidationDate,
                SecurityCode = creditCardDto.SecurityCode
            };
        }
    }
}