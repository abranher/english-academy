import axiosLib from "axios";
import { NEXT_PUBLIC_BACKEND_URL } from "@/config/app";

const axios = axiosLib.create({
  baseURL: NEXT_PUBLIC_BACKEND_URL,
});

export default axios;
