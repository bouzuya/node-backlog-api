export interface BacklogClient {
  _apiKey: string;
  _spaceKey: string;
}

const getApiKey = (client: BacklogClient): string => {
  return client._apiKey;
};

const getSpaceKey = (client: BacklogClient): string => {
  return client._spaceKey;
};

const newClient = (options: {
  apiKey: string;
  spaceKey: string;
}): BacklogClient => {
  return { _apiKey: options.apiKey, _spaceKey: options.spaceKey };
};

export {
  getApiKey,
  getSpaceKey,
  newClient
};
