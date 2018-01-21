export interface BacklogClient {
  _apiKey: string;
}

const newClient = (options: {
  apiKey: string;
}): BacklogClient => {
  return { _apiKey: options.apiKey };
};

export { newClient };
