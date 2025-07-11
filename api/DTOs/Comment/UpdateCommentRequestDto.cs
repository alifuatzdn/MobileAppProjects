using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTOs.Comment
{
    public class UpdateCommentRequestDto
    {
        [Required]
        [MinLength(5, ErrorMessage = "Content must be minimum 5 characters.")]
        [MaxLength(250, ErrorMessage = "Content connot be over 250 characters.")]
        public string Content { get; set; } = string.Empty;
    }
}