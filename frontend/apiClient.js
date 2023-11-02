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
      return response;
    } catch (error) {
      console.error("Error registering:", error);
      const errorMessage = error.response
        ? error.response.data
        : { message: error.message };
      throw errorMessage;
    }
  }
}

export default new ApiClient();
