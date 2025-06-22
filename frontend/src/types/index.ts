// filepath: /frontend/frontend/src/types/index.ts

export interface User {
  id: number;
  email: string;
}

export interface Videogame {
  id: number;
  title: string;
  company: string;
  year: number;
  price: number;
  listed: boolean;
}

export interface UserVideogame {
  userId: number;
  title: string;
  id: number;
  rating?: number;
}
