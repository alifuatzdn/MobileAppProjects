using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs.Product
{
    public class CreateProductRequestDto
    {
        [Required]
        [MinLength(2, ErrorMessage = "Name must be minimum 5 characters.")]
        [MaxLength(50, ErrorMessage = "Name cannot be over 50 characters.")]
        public string Name { get; set; } = string.Empty;
        [Required]
        [Range(1, 1000000)]
        public decimal Price { get; set; }
        [Required]
        public string Image { get; set; } = string.Empty;
    }
}