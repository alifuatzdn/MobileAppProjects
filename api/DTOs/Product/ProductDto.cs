using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.Comment;

namespace api.DTOs.Product
{
    public class ProductDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string Image { get; set; } = string.Empty;
        public decimal Rating { get; set; }
        public string Category { get; set; } = string.Empty;
        public List<CommentDto> Comments { get; set; }
    }
}