import axios from "axios";
import { isConstructSignatureDeclaration } from "typescript";

export const api = axios.create({
  baseURL: 'http://api.themoviedb.org/3',
  params: {
    api_key: '402e3ec998b2e3c1781bbba7214f49bb',
    lenguage: 'pt-BR',
    include_adult: true,
  },
});