import apiService from './apiService';

export interface AddressResponse {
  id: number;
  name: string;
  surname: string;
  phoneNumber: string;
  city: string;
  district: string;
  neighborhood: string;
  addressDetail: string;
  addressName: string;
}

export interface AddressRequest {
  name: string;
  surname: string;
  phoneNumber: string;
  city: string;
  district: string;
  neighborhood: string;
  addressDetail: string;
  addressName: string;
}

export const addAddress = async (address: AddressRequest): Promise<AddressResponse> => {
  const response = await apiService.create<AddressRequest, AddressResponse>("/address", address);
  return response;
};

export const getAddressById = async (id: number): Promise<AddressResponse> => {
  const response = await apiService.getById<AddressResponse>("/address", id);
  return response;
};

export const getAddresses = async (): Promise<AddressResponse[]> => {
  const response = await apiService.getAll<AddressResponse>("/address");
  return response;
};

export const updateAddress = async (id: number, address: AddressRequest): Promise<void> => {
  await apiService.update<AddressRequest>("/address", id, address);
};
export const deleteAddress = async (id: number): Promise<void> => {
  await apiService.delete("/address", id);
};