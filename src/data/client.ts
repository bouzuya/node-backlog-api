export interface BacklogClient {
  _apiKey: string;
  _spaceKey: string;
}

const newClient = (options: {
  apiKey: string;
  spaceKey: string;
}): BacklogClient => {
  return { _apiKey: options.apiKey, _spaceKey: options.spaceKey };
};

export { newClient };
