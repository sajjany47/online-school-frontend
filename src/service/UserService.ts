import { headerWithOutToken, headerWithToken } from "@/shared/Constant";
import axios from "axios";

export const userCreate = async (payload: any) => {
  const response = await axios.post(
    `/api/user/signup`,
    payload,
    headerWithOutToken()
  );
  return response.data;
};

export const userLogin = async (payload: any) => {
  const response = await axios.post(
    `/api/user/login`,
    payload,
    headerWithOutToken()
  );
  return response.data;
};

export const userDetails = async (payload: any) => {
  const response = await axios.post(
    `/api/user/:id`,
    payload,
    headerWithToken()
  );
  return response.data;
};
