import axios from "axios";

export const node = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Content-type": "application/json",
  },
});
