import axios, {
  AxiosInstance,
  AxiosError,
  AxiosProxyConfig,
  AxiosRequestConfig,
} from "axios";

/**
 * HTTP client wrapper with retry logic and error handling.
 *
 * @deprecated This class will be removed in a future version.
 * Use axios directly or create your own HTTP client implementation.
 */
export class ClientAPI {
  private client: AxiosInstance;
  private baseURL: string;
  private maxRetries: number = 3;
  private retryDelay: number = 1000; // ms

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    // Create axios instance with default config
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 10000, // 10 seconds
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Add request interceptor for logging
    this.client.interceptors.request.use(
      (config) => {
        console.log(
          `[IAM Client] ${config.method?.toUpperCase()} ${config.url}`
        );
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => this.handleAxiosError(error)
    );
  }

  // Generic GET method

  /**
   * Make a GET request
   * @param url
   * @param params
   * @returns
   */
  public async get<R = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.retryRequest<R>(() =>
      this.client.get<R>(url, config).then((res) => res.data)
    );
  }

  /**
   * Make a POST request
   * @param url
   * @param params
   * @param body
   * @returns
   */
  public async post<B = any, R = any>(
    url: string,
    body: B,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.retryRequest<R>(() =>
      this.client.post<R>(url, body, config).then((res) => res.data)
    );
  }
  /**
   * Make a PUT request
   * @param url
   * @param params
   * @param body
   * @returns
   */
  public async put<B = any, R = any>(
    url: string,
    body: B,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.retryRequest<R>(() =>
      this.client.put<R>(url, body, config).then((res) => res.data)
    );
  }

  /**
   * Make a DELETE request
   * @param url
   * @param params
   * @returns
   */
  public async delete<R = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.retryRequest<R>(() =>
      this.client.delete<R>(url, config).then((res) => res.data)
    );
  }

  /**
   * Retry logic for failed requests
   * Implements exponential backoff
   */
  private async retryRequest<T>(
    requestFn: () => Promise<T>,
    attempt: number = 1
  ): Promise<T> {
    try {
      return await requestFn();
    } catch (error) {
      if (attempt >= this.maxRetries) {
        throw error;
      }

      // Don't retry client errors (4xx), only server errors (5xx) and network errors
      if (axios.isAxiosError(error) && error.response?.status) {
        const status = error.response.status;
        if (status >= 400 && status < 500) {
          throw error;
        }
      }

      // Exponential backoff
      const delay = this.retryDelay * Math.pow(2, attempt - 1);
      console.log(
        `[IAM Client] Retry attempt ${attempt}/${this.maxRetries} after ${delay}ms`
      );
      await new Promise((resolve) => setTimeout(resolve, delay));

      return this.retryRequest(requestFn, attempt + 1);
    }
  }

  /**
   * Handle axios errors and transform to APIError
   */
  private handleAxiosError(error: AxiosError): never {
    if (error.response) {
      // Server responded with error status
      console.error(
        `[IAM Client] Error: ${error.response.status} - ${JSON.stringify(
          error.response.data
        )}`
      );
    } else if (error.request) {
      // Request made but no response
      console.error(
        `[IAM Client] No response from IAM service: ${error.message}`
      );
    } else {
      // Error in request setup
      console.error(`[IAM Client] Request setup error: ${error.message}`);
    }
    throw error;
  }
}
