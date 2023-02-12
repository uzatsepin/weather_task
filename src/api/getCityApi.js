import axios from "axios";

export const getCity = async (name) => {
  try {
    const response = await axios({
      method: "GET",
      url: `https://api.api-ninjas.com/v1/city?name=${name}&limit=10`,
      headers: { "X-Api-Key": "tv8o567aIuoI+73uheVF5w==L2l20V7RfeDmwVBz" },
    });
    return response.data;
  } catch (error) {
    console.error("Error: ", error);
    return error;
  }
};
