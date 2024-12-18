import axiosInstance from "../utils/axios";

export const login = async (email: string, password: string) => {
  const response = await axiosInstance.post("/auth/sign-in", {
    email,
    password,
  });

  return response.data; // Assumes response includes user details or token
};
