using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs.Product
{
    public class UpdateProductRequestDto
    {
        [MinLength(2, ErrorMessage = "Name must be minimum 5 characters.")]
        [MaxLength(50, ErrorMessage = "Name cannot be over 50 characters.")]
        public string Name { get; set; } = string.Empty;
        [Range(1, 1000000)]
        public decimal Price { get; set; }
        public string Image { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public decimal Rating { get; set; }
    }
}