import axios from 'axios'
const API_URL = 'https://fluxion-cdfpcve0h5hdakc7.eastus-01.azurewebsites.net/api'

export const getRegisterData  = async () => {
    try{
        const response = await axios.get(`${API_URL}/getRegistrartionData`);
        console.log(response.data)
        return response.data
    }catch(error){
        console.error('Error fetching registration data:', error);
        throw error; 
    }
};