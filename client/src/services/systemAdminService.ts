import { apiRequest } from "@/utils";
import { ApiService } from "./apiService";
import type { SuccessApiResponse } from "@/types";

export class SystemAdminService extends ApiService {
  constructor(endpoint: string) {
    super(endpoint);
  }

  async getOverview(): Promise<SuccessApiResponse> {
    return apiRequest({
      url: `${this.endpoint}/overview`,
      method: "GET",
    });
  }
}
