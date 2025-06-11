const API_URL = `${import.meta.env.VITE_API_URL}/workouts`

export const addWorkout = async (workoutData) => {
  console.log(workoutData);
  try {
    const response = await axios.post(`${API_URL}`, workoutData);
    return response.data;
  } catch (error) {
    console.error("Error adding workout", error);
  }
};

import axios from "axios";

export const getWorkoutsByDate = async (date: string) => {
  try {
    const response = await axios.get(`${API_URL}/${date}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch workouts", error);
    return [];
  }
};


export const getAllWorkOuts = async () => {
   try {
    const response = await axios.get(API_URL);
    return response.data
   }catch(error){
    console.log(error)
   }
}