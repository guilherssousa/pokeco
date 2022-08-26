import axios, { AxiosRequestConfig } from "axios";

const baseURL = "https://pokeapi.co/api/v2/";

const client = axios.create({ baseURL });

const cache: Record<string, any> = {};

const get = async (url: string, config?: AxiosRequestConfig<any>) => {
  if (cache[url]) {
    return cache[url];
  }

  const res = await client.get(url, config);

  cache[url] = res.data;

  return cache[url];
};

export default { cache, get, baseURL };
