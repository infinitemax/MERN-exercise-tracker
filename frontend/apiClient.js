import axios from "axios";

const url = process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:3001";

export class ApiClient {
  constructor() {}

  async register(email, password, username) {
    try {
      const response = await axios.post(`${url}/register`, {
        email,
        password,
        username,
      });
      return response;  // Return the response to the caller
    } catch (error) {
      console.error('Error in registration:', error);
      // Here we throw the error to let the caller handle it as per its own logic
      throw error;
    }
  }
}

export default new ApiClient();
