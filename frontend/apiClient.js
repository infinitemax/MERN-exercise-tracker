import axios from "axios";

const url = process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:3001";

// this line adds the JWT to our cookies.
// axios.defaults.withCredentials = true

export class ApiClient {
    constructor() {}

    async register(email, password, username) {
        try {
            const response = await axios.post(`${url}/register`, {
                email,
                password,
                username,
            });
            return response; // Return the response to the caller
        } catch (error) {
            console.error("Error in registration:", error);
            // Here we throw the error to let the caller handle it as per its own logic
            throw error;
        }
    }

    // login call
    async login(username, password) {
        try {
            console.log("this is the api client speaking!");
            console.log(`credentials are: ${username} and ${password}`);
            const response = await axios.post(
                `${url}/login`,
                {
                    username,
                    password,
                },
                { withCredentials: true } // note - this line allows the cookie to be updated.
            );
            console.log(response);
            return response;
        } catch (error) {
            // note from MBB - using error.response here, which I hear is a good way to make use of Axios' error object.
            return error.response;
        }
    }

    // load user data to dashboard
    async loadUserData() {
        try {
            const response = await axios.get(`${url}/myarea`, {
                withCredentials: true,
            });
            return response;
        } catch (error) {
            console.log(error.response);
            return error.response;
        }
    }

    // save user activity
    async saveUserActivity(data) { 
        console.log(data)
        try {
            const response = await axios.post(
                `${url}/myarea`,
                {
                    data,
                },
                { withCredentials: true }
            );
            return response;
        } catch (error) {
            console.log(error.response);
            return error.response;
        }
    }

    async updateUser(newUserInfo) {
        try {
            const response = await axios.patch(
                `${url}/settings`, 
                {newUserInfo},
                {withCredentials: true}
            );
            
            console.log(response)
        } catch (error) {
            console.log(error.response)
            res.status(500).json({
                status: 500,
                message: "Server error"
            })
        }
    }


    // delete a specified activity
    async deleteActivity(id){
        try {
            const response = await axios.delete(
                `${url}/myarea/${id}`,
                { withCredentials: true}
            );
            return response
        } catch (error) {
            console.log(error.response)
            res.status(500).json({
                status: 500,
                message: "Server error"
            })
        }

    }


    //Save ranomly selected suggestion to database
    async saveSelectedSuggestion(suggestionData) {
        try {
          const response = await axios.post(
            `${url}/save-selected-suggestion`,
            suggestionData,
            {
              withCredentials: true,
            }
          );
          return response;
        } catch (error) {
          throw error;
        }
      }

// get input options for suggesting exercise
    async getExerciseOptions() {
        try {
            const response = await axios.get(`${url}/exercise-options`, { withCredentials: true });
            console.log("Fetched types:", response.data.types);
            console.log("Fetched difficulties:", response.data.difficulties);
            console.log("Fetched muscle:", response.data.muscles);
            return response;
        } catch (error) {
            console.error("Error fetching exercise options:", error);
            throw error;
        }
    }
    
    async getExerciseSuggestions({ name, type, muscle, difficulty }) {
        try {
            const response = await axios.get(`${url}/exercise-suggestions`, {
                params: { name, type, muscle, difficulty },
                withCredentials: true,
                
            });
            return response;
        } catch (error) {
            console.error("Error fetching exercise suggestions:", error);
            throw error;
        }
    }
    

    async logOut() {
        console.log("logging out");

        try {
            const response = await axios.get(`${url}/logout`, {
                withCredentials: true,
            });
            return response;
        } catch (error) {
            console.log(error.response);
            return error.response;
        }
    }
}

export default new ApiClient();
