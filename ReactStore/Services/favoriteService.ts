import apiService from "./apiService";
import { Product } from "./productService";

export interface FavoriteResponse {
  productId: number;
  product: Product;
}

export interface FavoriteRequest {
  productId: number;
}

export const addFavorites = async (id: number): Promise<void> => {
  const payload = { productId: id };
  await apiService.create("/favorites", payload);
};

export const deleteFavorites = async (id: number): Promise<void> => {
  await apiService.delete("/favorites", id);
};

export const getAllFavorites = async (): Promise<FavoriteResponse[]> => {
  const response = await apiService.getAll<FavoriteResponse>("/favorites");
  return response;
};