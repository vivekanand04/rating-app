import type { SuccessApiResponse } from "@/types";
import { apiRequest } from "../utils";

export class ApiService {
  public endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  async get(params?: Record<string, unknown>): Promise<SuccessApiResponse> {
    return apiRequest({
      url: this.endpoint,
      method: "GET",
      params,
    });
  }

  async getById(id: string | number): Promise<SuccessApiResponse> {
    return apiRequest({
      url: `${this.endpoint}/by-id/${id}`,
      method: "GET",
    });
  }

  async post(data: Record<string, unknown>): Promise<SuccessApiResponse> {
    return apiRequest({
      url: this.endpoint,
      method: "POST",
      data,
    });
  }

  async put(
    id: string | number,
    data: Record<string, unknown>
  ): Promise<SuccessApiResponse> {
    return apiRequest({
      url: `${this.endpoint}/${id}`,
      method: "PUT",
      data,
    });
  }

  async patch(
    id: string | number,
    data: Record<string, unknown>
  ): Promise<SuccessApiResponse> {
    return apiRequest({
      url: `${this.endpoint}/${id}`,
      method: "PATCH",
      data,
    });
  }

  async delete(id: string | number): Promise<SuccessApiResponse> {
    return apiRequest({
      url: `${this.endpoint}/${id}`,
      method: "DELETE",
    });
  }
}
