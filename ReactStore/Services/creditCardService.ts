import apiService from './apiService';

export interface CreditCardResponse {
  id: number;
  name: string;
  cardNumber: string;
  cardHolderName: string;
  validationDate: string;
  securityCode: number;
}

export interface CreditCardRequest {
  name: string;
  cardNumber: string;
  cardHolderName: string;
  validationDate: string;
  securityCode: number;
}

export const addCreditCard = async (creditCard: CreditCardRequest): Promise<CreditCardResponse> => {
  const response = await apiService.create<CreditCardRequest, CreditCardResponse>("/creditCard", creditCard);
  return response;
};

export const getCreditCardById = async (id: number): Promise<CreditCardResponse> => {
  const response = await apiService.getById<CreditCardResponse>("/creditCard", id);
  return response;
};

export const getCreditCards = async (): Promise<CreditCardResponse[]> => {
  const response = await apiService.getAll<CreditCardResponse>("/creditCard");
  return response;
};

export const updateCreditCard = async (id: number, creditCard: CreditCardRequest): Promise<void> => {
  await apiService.update<CreditCardRequest>("/creditCard", id, creditCard);
};
export const deleteCreditCard = async (id: number): Promise<void> => {
  await apiService.delete("/creditCard", id);
};