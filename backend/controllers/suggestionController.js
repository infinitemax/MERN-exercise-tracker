const axios = require('axios');

exports.getExerciseSuggestions = async (req, res) => {
  const { name, type, muscle, difficulty } = req.query;

 
  const apiKey = process.env.API_NINJAS_KEY;
  const apiUrl = 'https://api.api-ninjas.com/v1/exercises';

  try {
    // Make the request to the external API
    const response = await axios.get(apiUrl, {
      headers: { 'X-Api-Key': apiKey },
      params: { name, type, muscle, difficulty },
    });

    // Send the response back to the frontend
    res.json(response.data);
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: 'Error fetching exercise suggestions', error: error.message });
  }
};