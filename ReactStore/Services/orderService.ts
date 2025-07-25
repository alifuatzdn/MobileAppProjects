import apiService from './apiService';
import { AddressResponse } from './addressService';
import { CreditCardResponse } from './creditCardService';
import { Product } from './productService';

export interface OrderResponse {
  id: number;
  products: Product[];
  addressId: number;
  address: AddressResponse;
  creditCardId: number;
  creditCard: CreditCardResponse;
  totalPrice: number;
  createdAt: Date;
}

export interface OrderRequest {
  productIds: Number[];
  addressId: number;
  creditCardId: number;
  totalPrice: number;
}

export const addOrder = async (order: OrderRequest): Promise<OrderResponse> => {
  const response = await apiService.create<OrderRequest, OrderResponse>("/order", order);
  return response;
};

export const getOrderById = async (id: number): Promise<OrderResponse> => {
  const response = await apiService.getById<OrderResponse>("/order", id);
  return response;
};

export const getOrders = async (): Promise<OrderResponse[]> => {
  const response = await apiService.getAll<OrderResponse>("/order");
  return response;
};

export const updateOrder = async (id: number, order: OrderRequest): Promise<void> => {
  await apiService.update<OrderRequest>("/order", id, order);
};
export const deleteOrder = async (id: number): Promise<void> => {
  await apiService.delete("/order", id);
};