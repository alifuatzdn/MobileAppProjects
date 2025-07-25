using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using api.DTOs.Product;
using api.Models;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace api.Mappers
{
    public static class ProductMappers
    {
        public static ProductDto ToProductDto(this Product productModel)
        {
            return new ProductDto
            {
                Id = productModel.Id,
                Name = productModel.Name,
                Price = productModel.Price,
                Image = productModel.Image,
                Rating = productModel.Rating,
                Category = productModel.Category,
                Comments = productModel.Comments.Select(c => c.ToCommentDto()).ToList()
            };
        }

        public static Product ProductCreateDto(this CreateProductRequestDto ProductDto)
        {
            return new Product
            {
                Name = ProductDto.Name,
                Price = ProductDto.Price,
                Image = ProductDto.Image,
                Category = ProductDto.Category
            };
        }

        public static ProductCartDto ToProductCartDto(this Product productModel)
        {
            return new ProductCartDto
            {
                Id = productModel.Id,
                Name = productModel.Name,
                Price = productModel.Price,
                Image = productModel.Image
            };
        }
    }
}