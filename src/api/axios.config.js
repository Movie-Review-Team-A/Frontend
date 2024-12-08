import axios from "axios";

export const jsonAxios = axios.create({
  baseURL: "/api/",
  headers: {
    "Content-Type": "application/json",
  },
});
