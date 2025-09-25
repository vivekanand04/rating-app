type SuccessResponseParams = {
  message?: string;
  data?: any;
};

type ErrorResponseParams = {
  message: string;
};

export function successResponse({ message, data }: SuccessResponseParams) {
  return {
    success: true,
    ...(message ? { message } : {}),
    ...(data ? { data } : {}),
  };
}

export function errorResponse({ message }: ErrorResponseParams) {
  return {
    success: false,
    error: message,
  };
}
