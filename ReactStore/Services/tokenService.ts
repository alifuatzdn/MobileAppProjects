import * as SecureStore from 'expo-secure-store';

export const saveToken = async (token: string): Promise<void> => {
  await SecureStore.setItemAsync('userToken', token);
};

export const getToken = async (): Promise<string | null> => {
  return await SecureStore.getItemAsync('userToken');
};

export const deleteToken = async (): Promise<void> => {
  await SecureStore.deleteItemAsync('userToken');
};