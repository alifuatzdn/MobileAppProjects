using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.CreditCard;
using api.Interfaces;
using api.Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/creditCard")]
    [ApiController]
    public class CreditCardController : ControllerBase
    {
        private readonly ICreditCardRepository _creditCardRepo;
        public CreditCardController(ICreditCardRepository creditCardRepo)
        {
            _creditCardRepo = creditCardRepo;

        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAll()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userId = User.FindFirst("id")?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            var creditCards = await _creditCardRepo.GetAllAsync(userId);
            var creditCardDto = creditCards.Select(a => a.ToCreditCardDto());

            return Ok(creditCardDto);
        }

        [HttpGet("{id:int}")]
        [Authorize]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userId = User.FindFirst("id")?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            var creditCard = await _creditCardRepo.GetByIdAsync(id, userId);
            if (creditCard == null)
            {
                return NotFound();
            }

            return Ok(creditCard.ToCreditCardDto());
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create([FromBody] CreateCreditCardDto creditCardDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userId = User.FindFirst("id")?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            var creditCard = creditCardDto.CreditCardCreateDto(userId);
            var createdCreditCard = await _creditCardRepo.CreateAsync(creditCard);

            return CreatedAtAction(nameof(GetById), new { id = createdCreditCard.Id }, createdCreditCard.ToCreditCardDto());
        }

        [HttpPut("{id:int}")]
        [Authorize]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateCreditCardDto updateDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userId = User.FindFirst("id")?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            var creditCard = await _creditCardRepo.UpdateAsync(id, userId, updateDto.CreditCardUpdateDto());

            if (creditCard == null)
            {
                return NotFound("Address not found.");
            }

            return Ok(creditCard.ToCreditCardDto());
        }

        [HttpDelete("{id:int}")]
        [Authorize]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userId = User.FindFirst("id")?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized();
            }

            var creditCard = await _creditCardRepo.DeleteAsync(id, userId);

            if (creditCard == null)
            {
                return NotFound("Address not found.");
            }

            return Ok(creditCard);
        }
    }
}

