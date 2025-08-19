import axios from "axios";

export const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL || 'https://hozn-topaz.vercel.app/api'}/auth`,
  headers: {
    "Content-Type": "application/json",
  },
});
