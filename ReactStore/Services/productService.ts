import apiService from "./apiService";
import { CommentResponse } from "./commentService";

export interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  image: string;
  comments: CommentResponse[];
}

export const getAllProducts = async (): Promise<Product[]> => {
  const response = await apiService.getAll<Product>("/product");
  return response;
};

export const getProductById = async (id: number): Promise<Product> => {
  const response = await apiService.getById<Product>("/product", id);
  return response;
};