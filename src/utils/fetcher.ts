type Options = {
  method?:
    | 'GET'
    | 'POST'
    | 'DELETE'
    | 'PATCH'
    | 'PUT'
    | 'HEAD'
    | 'OPTIONS'
    | 'CONNECT';
  headers?: Record<string, string>;
  body?: Record<string, unknown>;
};

async function fetcher<T>(url: string, options: Options = {}): Promise<T> {
  const { headers, body, ...otherOptions } = options;
  const response = await fetch(url, {
    ...otherOptions,
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const data = await (response.status === 204 ? null : response.json());
  if (data?.error) throw new Error(data.error);
  return data as T;
}

export default fetcher;
