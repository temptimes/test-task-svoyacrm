const BASE_URL = "https://jsonplaceholder.typicode.com";

const defaultHeaders = {
  "Content-Type": "application/json",
};

export const apiRequest = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  try {
    const { body, ...restOptions } = options;
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...restOptions,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};
