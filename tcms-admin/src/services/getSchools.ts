import axiosInstance from "../utils/axios";

export const getSchools = async () => {
  let token = localStorage.getItem("user");

  // Remove quotes if token is stored as a JSON string
  if (token?.startsWith('"') && token.endsWith('"')) {
    token = token.slice(1, -1); // Remove leading and trailing quotes
  }

  //   console.log("Token after cleanup: ", token);

  try {
    const response = await axiosInstance.get("/admin/schools", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // console.log("Response of schools: ", response);
    return response.data;
  } catch (error) {
    console.error("Error fetching schools:", error);
    throw error;
  }
};
