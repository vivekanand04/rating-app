import type { AxiosRequestConfig, Method } from "axios";

export interface ApiRequestOptions {
  url: string;
  method?: Method;
  headers?: Record<string, string>;
  params?: Record<string, unknown>;
  data?: unknown;
  baseURL?: string;
  timeout?: number;
  responseType?: AxiosRequestConfig["responseType"];
  withCredentials?: boolean;
}

export type SuccessApiResponse = {
  success: boolean;
  message: string;
  data?: unknown;
};

export type BaseFormField = {
  label: string;
  component: React.ElementType;
  props?: Record<string, unknown>;
  description?: string;
};

export type User = {
  id: string;
  name: string;
  address: string;
  email: string;
  role: string;
  storeRating?: number;
};

export type Stat = {
  label: string;
  value: string | number;
};

export type GenericSelectOption = {
  label: string;
  value: string;
};

export type Store = {
  id: string;
  name: string;
  email: string;
  address: string;
  averageRating: number;
  userRating?: {
    id: string;
    value: number;
    userId: string;
    user: {
      id: string;
      name: string;
    };
  };
};

export type Rating = {
  id: string;
  value: number;
  user: { id: string; name: string };
  store: {
    id: string;
    name: string;
    averageRating: number | null;
  };
};
