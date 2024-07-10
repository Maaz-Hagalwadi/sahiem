// import axios from 'axios';

// const API_URL = 'http://localhost:5000'; // Replace with your actual backend URL

// export const searchBuses = async (pickup, dropoff, date) => {
//   try {
//     const response = await axios.get(`${API_URL}/bus`, {
//       params: { from: pickup, to: dropoff, date }
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching bus data:', error);
//     throw error;
//   }
// };


import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Adjust this URL to match your backend URL

export const searchBuses = async (pickup, dropoff, date) => {
  try {
    const response = await axios.get(`${API_URL}/bus`, {
      params: { from: pickup, to: dropoff, date }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching bus data:', error);
    throw error;
  }
};
