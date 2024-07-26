import axios from "axios";
import { isConstructSignatureDeclaration } from "typescript";

export const api = axios.create({
  baseURL: 'http://api.themoviedb.org/3',
  params: {
    api_key: '6b4d68bb6e6a28ad7f140167076eeb52',
    lenguage: 'pt-BR',
    include_adult: true,
  },
});