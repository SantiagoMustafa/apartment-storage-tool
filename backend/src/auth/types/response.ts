interface OkResponse {
  status: number;
  message: string;
  data: object;
}

interface BadResponse {
  status: number;
  message: string;
  errorCode: string;
}

export { OkResponse, BadResponse };
