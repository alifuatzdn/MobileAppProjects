using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.Comment;
using api.Models;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace api.Mappers
{
    public static class CommentMapper
    {
        public static CommentDto ToCommentDto(this Comment commentModel)
        {
            return new CommentDto
            {
                Id = commentModel.Id,
                Content = commentModel.Content,
                CreatedOn = commentModel.CreatedOn,
                ProductId = commentModel.ProductId
            };
        }

        public static Comment CommentCreateDto(this CreateCommentDto commentDto, int productId)
        {
            return new Comment
            {
                Content = commentDto.Content,
                ProductId = productId
            };
        }

        public static Comment CommentUpdateDto(this UpdateCommentRequestDto commentDto)
        {
            return new Comment
            {
                Content = commentDto.Content,
            };
        }
    }
}