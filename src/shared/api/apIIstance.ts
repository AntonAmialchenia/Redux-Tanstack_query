const API_URL = 'http://localhost:3000';

class ApiError extends Error {
  constructor(public response: Response) {
    super('ApiError: ' + response.status);
  }
}

// export const jsonApiInstance =
//   <T>(url: string, init?: RequestInit) =>
//   async (meta: { signal: AbortSignal }) => {
//     const result = await fetch(API_URL + url, { ...init, signal: meta.signal });
//     if (!result.ok) {
//       throw new ApiError(result);
//     }
//     const data = (await result.json()) as Promise<T>;
//     return data;
//   };

export const jsonApiInstance = async <T>(url: string, init?: RequestInit) => {
  const result = await fetch(API_URL + url, init);
  if (!result.ok) {
    throw new ApiError(result);
  }
  const data = (await result.json()) as Promise<T>;
  return data;
};
