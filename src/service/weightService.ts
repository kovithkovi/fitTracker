import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/weight`;

export const addWeight = async (data) => {
    try{
        const response = axios.post(API_URL, data);
        return response;
    }catch(error){
        console.log("Unable to Add weight");
    }
} 

export const getAllWeights = async () => {
    try {
        const response = axios.get(API_URL);
        return response;
    } catch (error) {
        console.log("Uable to fetch the weights");
    }
}