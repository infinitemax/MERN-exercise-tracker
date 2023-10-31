import axios from 'axios';

const url = process.env.NEXT_PUBLIC_API_ENDPOINT || 'http://localhost:3001/';

export class ApiClient {
  constructor() {
   
  }

  async register(email, password) {
    try {
      const response = await axios.post(`${url}/register`, {
        email,
        username,
        password,
      });
      return response.data;
    } catch (error) {
      console.error('Error registering:', error);
      throw error;
    }
  }

}

export default new ApiClient();
