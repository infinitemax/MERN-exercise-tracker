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
