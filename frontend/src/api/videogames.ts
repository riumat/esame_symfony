import axios from "axios";
import { getToken } from "../libs/storage";

const API_URL = "http://localhost:8000/api";

export const fetchVideogames = async () => {
  const token = getToken();
  const response = await axios.get(API_URL + "/games", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
};

export const fetchVideogameById = async (id:number) => {
  const token = getToken();
  const response = await axios.get(API_URL + `/games/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
};

// Cerca videogiochi
export const searchVideogames = async (query: string, sort?: string) => {
  const token = getToken();
  const params: any = { q: query };
  if (sort) params.sort = sort;
  const response = await axios.get(API_URL + "/games/search", {
    params,
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.data;
};



