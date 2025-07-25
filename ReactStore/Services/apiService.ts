import axios, { AxiosInstance } from "axios";
import { getToken } from "./tokenService";

class ApiService {
  private api: AxiosInstance;

  constructor(baseURL: string) {
    this.api = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.api.interceptors.request.use(async (config) => {
      const token = await getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  async get<T>(endpoint: string, token?: string): Promise<T> {
    const response = await this.api.get(endpoint, {
      headers: token ? { Authorization: token } : undefined,
    });
    return response.data;
  }

  async getAll<T>(endpoint: string, token?: string): Promise<T[]> {
    const response = await this.api.get(endpoint, {
      headers: token ? { Authorization: token } : undefined,
    });
    return response.data;
  }

  async getById<T>(endpoint: string, id: number, token?: string): Promise<T> {
    const response = await this.api.get(`${endpoint}/${id}`, {
      headers: token ? { Authorization: token } : undefined,
    });
    return response.data;
  }

  async create<RequestType, ResponseType>(
    endpoint: string,
    data: RequestType,
    token?: string
  ): Promise<ResponseType> {
    const response = await this.api.post(endpoint, data, {
      headers: token ? { Authorization: token } : undefined,
    });
    return response.data;
  }

  async update<T>(endpoint: string, id: number, data: T, token?: string): Promise<T> {
    const response = await this.api.put(`${endpoint}/${id}`, data, {
      headers: token ? { Authorization: token } : undefined,
    });
    return response.data;
  }

  async put<T>(endpoint: string, data: T, token?: string): Promise<T> {
    const response = await this.api.put(endpoint, data, {
      headers: token ? { Authorization: token } : undefined,
    });
    return response.data;
  }

  async delete(endpoint: string, id: number, token?: string): Promise<void> {
    await this.api.delete(`${endpoint}/${id}`, {
      headers: token ? { Authorization: token } : undefined,
    });
  }
}


const apiService = new ApiService("http://192.168.2.186:5062/api");
export default apiService;