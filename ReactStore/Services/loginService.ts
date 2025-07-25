import apiService from './apiService';
import { User } from '@/Context/AuthContext';
import { saveToken, getToken, deleteToken } from './tokenService';

interface LoginResponse {
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  birthDate: string;
  token: string;
}

interface UserUpdate {
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  birthDate: string;
  password: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const payload: LoginRequest = { email, password };
  const response = await apiService.create<LoginRequest, LoginResponse>('/account/login', payload);

  await saveToken(response.token);
  return response;
};

export const checkLoginStatus = async (): Promise<boolean> => {
  const token = await getToken();
  return token !== null;
};

export const logOut = async (): Promise<void> => {
  await deleteToken();
};

export const getUserInfo = async (): Promise<User> => {
  const response = await apiService.get<User>('/account/me');
  return response;
};

export const updateUser = async (user: UserUpdate): Promise<void> => {
  await apiService.put<UserUpdate>('/account/update', user);
};

