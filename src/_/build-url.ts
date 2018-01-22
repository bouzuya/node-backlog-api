import { URL } from 'url';

const buildUrl = (
  baseUrl: string,
  path: string,
  query: { [name: string]: string; }
): string => {
  const url = new URL(path, baseUrl);
  const searchParams = url.searchParams;
  Object.keys(query).sort().forEach((key) => {
    searchParams.append(key, query[key]);
  });
  return url.toString();
};

export { buildUrl };
