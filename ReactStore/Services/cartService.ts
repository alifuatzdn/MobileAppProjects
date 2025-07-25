import apiService from "./apiService";
import { Product } from "./productService";

export interface CartResponse {
  productId: number;
  quantity: number;
  product: Product;
}

export interface CartRequest {
  productId: number;
  newQuantity: number;
}

export const addBasket = async (id: number): Promise<void> => {
  const payload = { productId: id };
  await apiService.create("/cart", payload);
};

export const deleteBasket = async (id: number): Promise<void> => {
  await apiService.delete("/cart", id);
};

export const getBasket = async (): Promise<CartResponse[]> => {
  const response = await apiService.getAll<CartResponse>("/cart");
  return response;
};

export const updateBasket = async (id: number, newQuantity: number): Promise<void> => {
  const payload = { newQuantity };
  await apiService.update("/cart", id, payload);
};