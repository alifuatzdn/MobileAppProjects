import apiService from './apiService';
import { User } from '@/Context/AuthContext';
import { saveToken } from "./tokenService";

interface RegisterResponse {
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  birthDate: string;
  token: string;
}

interface RegisterRequest {
  name: string;
  surname: string;
  email: string;
  password: string;
  phoneNumber: string;
  birthDate: string;
}

export const registerPost = async (name: string, surname: string, email: string, password: string, phoneNumber: string, birthDate: string): Promise<RegisterResponse> => {
  const payload: RegisterRequest = { email, surname, name, phoneNumber, birthDate, password };
  const response = await apiService.create<RegisterRequest, RegisterResponse>('/account/register', payload);

  await saveToken(response.token);
  return response;
}

export const getUserInfo = async (): Promise<User> => {
  const response = await apiService.get<User>('/account/me');
  return response;
};
