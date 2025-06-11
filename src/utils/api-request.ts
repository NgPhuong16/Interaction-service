const axios = require('axios');

interface ApiCallOptions {
  method?: string; // Phương thức HTTP (GET, POST, PUT, DELETE, ...)
  url: string; // URL của API cần gọi (Bắt buộc)
  data?: object | null; // Dữ liệu gửi đi trong body (cho POST, PUT, PATCH)
  params?: object | null; // Các tham số query string (cho GET)
  headers?: object; // Các headers tùy chỉnh muốn gửi kèm
}

/**
 * Reusable function for making API requests to other backend services.
 *
 * @param {object} options - Options for the API call.
 * @param {string} options.method - HTTP method (GET, POST, PUT, DELETE, ...). Default is 'GET'.
 * @param {string} options.url - The API endpoint URL. (Required)
 * @param {object|null} [options.data=null] - Data to send in the request body (for POST, PUT, PATCH).
 * @param {object|null} [options.params=null] - Query string parameters (for GET).
 * @param {object} [options.headers={}] - Custom headers to include in the request.
 * @returns {Promise<{success: boolean, data: any | null, error: any | null, status: number | null}>}
 * Returns an object containing:
 * - success: true if the request was successful, false otherwise.
 * - data: The response data from the API if successful.
 * - error: Error information if the request failed.
 * - status: The HTTP status code returned.
 */
export async function callApi({
  method = 'GET',
  url,
  data = null,
  params = null,
  headers = {},
}: ApiCallOptions) {
  // Kiểm tra URL có được cung cấp không
  if (!url) {
    console.error('Lỗi: URL là bắt buộc để gọi API.');
    return {
      success: false,
      data: null,
      error: { message: 'URL is required' },
      status: null,
    };
  }
  const config: any = {
    method: method.toUpperCase(),
    url,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...headers,
    },
    params, // For query params (GET)
  };

  if (config.method !== 'GET' && data !== undefined) {
    config.data = data;
  }
  console.log('API Request Config:', config);
  return await axios(config);
}
