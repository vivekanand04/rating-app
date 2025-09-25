import { apiRequest } from "@/utils";
import { ApiService } from "./apiService";
import type { SuccessApiResponse } from "@/types";

export class AuthService extends ApiService {
  constructor(endpoint: string) {
    super(endpoint);
  }

  async signIn(data: Record<string, unknown>): Promise<SuccessApiResponse> {
    return apiRequest({
      url: `${this.endpoint}/signin`,
      method: "POST",
      data,
    });
  }

  async signUp(data: Record<string, unknown>): Promise<SuccessApiResponse> {
    return apiRequest({
      url: `${this.endpoint}/signup`,
      method: "POST",
      data,
    });
  }

  async signOut(): Promise<SuccessApiResponse> {
    return apiRequest({
      url: `${this.endpoint}/signout`,
      method: "POST",
    });
  }
}
