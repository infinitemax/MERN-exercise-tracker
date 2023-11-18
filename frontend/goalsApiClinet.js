import axios from "axios";

const url = process.env.NEXT_PUBLIC_API_ENDPOINT || "http://localhost:3001";

export class GoalsApiClient {
    constructor() {}

    async addGoal(goal) {
        try {
            const response = await axios.post(`${url}/goals`, { goal }, { withCredentials: true });

            console.log(response);
            return response
        } catch (error) {
            console.log(error.response);
            return error.response;
        }
    }

    async getUserGoals() {
        try {
            const response = await axios.get(`${url}/goals`, { withCredentials: true })
            console.log(response)
            return response

        } catch (error) {
            console.log(error.response);
            return error.response;
        }
    }

    async deleteGoal(id) {
        try {
            console.log(`deleting: ${id}`)
            const response = await axios.delete(
                `${url}/goals/${id}`,
                { withCredentials: true }
            )
        } catch (error) {
            console.log(error.response)
            return error.response
        }
    }
}

export default new GoalsApiClient