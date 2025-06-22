import axios from "axios";
import { getToken } from "../libs/storage";

const API_URL = "http://localhost:8000/api";
const USER_API_URL = "/user/games";

export async function fetchUserGames() {
  const token = getToken();
  const response = await axios.get(API_URL + USER_API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data || [];
}

export const addUserGame = async (videogameId: number) => {
  const token = getToken();
  const response = await axios.post(
    API_URL + USER_API_URL,
    {
      videogame_id: videogameId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const removeUserGame = async (videogameId: number) => {
  const token = getToken();
  const response = await axios.delete(API_URL + USER_API_URL, {
    data: { videogame_id: videogameId },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateUserGameRating = async (
  videogameId: number,
  rating: number
) => {
  const token = getToken();
  const response = await axios.put(
    API_URL + USER_API_URL,
    {
      videogame_id: videogameId,
      rating,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.status;
};
