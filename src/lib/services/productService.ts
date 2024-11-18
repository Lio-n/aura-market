import { PUBLIC_PLATZI_FAKE_STORE_API_V1 } from '$env/static/public';
import { CodeByCategory, type CATEGORY, type ProductEntity } from '$lib/stores/product.store';
import axios, { type AxiosInstance } from 'axios';

const ProductInstance = axios.create({
  baseURL: PUBLIC_PLATZI_FAKE_STORE_API_V1,
});

export interface ApiError {
  message: string;
  status: number;
}

interface ApiResponse<T> {
  data: T;
  status: number;
  error: ApiError | null;
}

export class ProductService {
  static ProductApi: AxiosInstance = ProductInstance;
  constructor() {}

  static async getProducts(params: string = '/?offset=0&limit=8'): Promise<ApiResponse<ProductEntity[] | null>> {
    let data: ProductEntity[] | null = null;
    let status: number = 418;
    let error: ApiError | null = null;

    try {
      const res = await this.ProductApi.get<ProductEntity[] | null>('products' + params);
      data = res.data;
      status = res.status;
    } catch (error: any) {
      error = {
        message: error.message,
        status: error.response.status,
      };
    }

    return { data, status, error };
  }

  static async getByCategory(
    category: CATEGORY,
    params: string = '&offset=0&limit=8'
  ): Promise<ApiResponse<ProductEntity[] | null>> {
    let data: ProductEntity[] | null = null;
    let status: number = 418;
    let error: ApiError | null = null;

    try {
      const res = await this.ProductApi.get<ProductEntity[] | null>(
        `products/?categoryId=${CodeByCategory[category]}${params}`
      );
      data = res.data;
      status = res.status;
    } catch (error: any) {
      error = {
        message: error.message,
        status: error.response.status,
      };
    }

    return { data, status, error };
  }

  static async getById(id: number | string): Promise<ApiResponse<ProductEntity | null>> {
    let data: ProductEntity | null = null;
    let status: number = 418;
    let error: ApiError | null = null;

    try {
      const res = await this.ProductApi.get<ProductEntity | null>(`products/${id}`);
      data = res.data;
      status = res.status;
    } catch (error: any) {
      error = {
        message: error.message,
        status: error.response.status,
      };
    }

    return { data, status, error };
  }
}
