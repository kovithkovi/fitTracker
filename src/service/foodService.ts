import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/food`;
// 🔹 Add new food entry
export const addFood = async (food) => {
  console.log(food);
  const response = await axios.post(`${API_URL}`, food);
  return response.data;
};

// 🔹 Get food entries by date
export const getFoodByDate = async (date: string) => {
  const response = await axios.get(`${API_URL}/${date}`);
  return response.data;
};


export const getAllFood = async () => {
    const response = await axios.get(API_URL);
    return response.data;
}