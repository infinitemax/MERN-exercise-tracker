const axios = require('axios');
const redisClient = require('../lib/redisClient');
const { Suggestion } = require('../models/Suggestions');
const { User } = require('../models/User');

exports.getExerciseSuggestions = async (req, res) => {
  const { name, type, muscle, difficulty } = req.query;
  console.log(req.body)
  const userId = req.userId
  // Create a unique cache key based on the query parameters
  const redisKey = `exercise:${name}:${type}:${muscle}:${difficulty}:${userId}`;


  try {
    // Check for cached data in Redis first
    console.log(`Checking Redis Cache for key: ${redisKey}`);
    const cachedData = await redisClient.get(redisKey);
    if (cachedData) {
      console.log('Retrieved data from Redis cache');
      return res.json(JSON.parse(cachedData));
    }


    console.log('Making API request');
    // If not in cache, fetch from the API
    const apiKey = process.env.API_NINJAS_KEY;
    const apiUrl = 'https://api.api-ninjas.com/v1/exercises';
    const response = await axios.get(apiUrl, {
      headers: { 'X-Api-Key': apiKey },
      params: { name, type, muscle, difficulty },
    });

    // Cache the API response in Redis
    // expiration time (1 hour = 3600 seconds)
    console.log('Storing in Redis');
    await redisClient.setex(redisKey, 3600, JSON.stringify(response.data));
    
    console.log('API Response Data:', response.data); 
 // Save the new suggestion in MongoDB
    const newSuggestion = new Suggestion({
      ...response.data,
      user: userId
    });
    await newSuggestion.save();
    console.log(`newSuggestion._id = ${newSuggestion._id}`);
     // Add the suggestion reference to the user's document
     await User.findByIdAndUpdate(userId, {
      $push: { suggestions: newSuggestion._id }
    });
    console.log('Storing suggestion for user in MongoDB');
    // Send response back to the frontend
    res.json(response.data);
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: 'Error fetching exercise suggestions', error: error.message });
  }
};