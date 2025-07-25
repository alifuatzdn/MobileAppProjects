import apiService from "./apiService";
import { CommentResponse } from "./commentService";

export interface Coupon {
  id: number;
  name: string;
  discount: number;
  minLimit: number;
}

export const getCouponsByUser = async (): Promise<Coupon[]> => {
  const response = await apiService.getAll<Coupon>("/coupon/user");
  return response;
};

export const deleteCoupon = async (id: number): Promise<void> => {
  await apiService.delete("/coupon/user", id);
};