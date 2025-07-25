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
                UserId = commentModel.UserId,
                ProductId = commentModel.ProductId,
                UserName = commentModel.User?.Name + " " + commentModel.User?.Surname
            };
        }

        public static Comment CommentCreateDto(this CreateCommentDto commentDto, int productId, string userId)
        {
            return new Comment
            {
                Content = commentDto.Content,
                UserId = userId,
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