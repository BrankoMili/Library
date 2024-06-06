import axios from "axios";

export const baseURL = "http://localhost:8080/api";

export const baseURLAddress = "http://localhost:8080";

const instance = axios.create({
  baseURL: baseURL
});

export default instance;
