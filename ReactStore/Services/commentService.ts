import apiService from './apiService';

export interface CommentResponse {
  id: number;
  content: string;
  createdOn: Date;
  productId: number;
  userName: string;
}

export interface CommentRequest {
  content: string;
}

export const addComment = async (comment: CommentRequest, productId: number): Promise<CommentResponse> => {
  const response = await apiService.create<CommentRequest, CommentResponse>(`/comment/${productId}`, comment);
  return response;
};

export const getCommentById = async (id: number): Promise<CommentResponse> => {
  const response = await apiService.getById<CommentResponse>("/comment", id);
  return response;
};

export const getComments = async (): Promise<CommentResponse[]> => {
  const response = await apiService.getAll<CommentResponse>("/comment");
  return response;
};

export const getCommentsByUser = async (): Promise<CommentResponse[]> => {
  const response = await apiService.getAll<CommentResponse>("/comment/user");
  return response;
};

export const updateComment = async (id: number, comment: CommentRequest): Promise<void> => {
  await apiService.update<CommentRequest>("/comment", id, comment);
};
export const deleteComment = async (id: number): Promise<void> => {
  await apiService.delete("/comment", id);
};