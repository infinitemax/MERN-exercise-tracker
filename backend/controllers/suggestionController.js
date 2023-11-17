const axios = require('axios');
const redisClient = require('../lib/redisClient');
const { Suggestion } = require('../models/Suggestions');
const { User } = require('../models/User');

exports.saveSelectedSuggestion = async (req, res) => {
  const suggestionData = req.body;
  const userId = req.userId;

  try {
    // Create a new Suggestion document with the provided data and user ID
    const newSuggestion = new Suggestion({
      ...suggestionData,
      user: userId
    });

    // Save the new suggestion to MongoDB
    await newSuggestion.save();

    // Add the suggestion reference to the user's document
    await User.findByIdAndUpdate(userId, {
      $push: { suggestions: newSuggestion._id }
    });

    // Respond with the newly created suggestion
    res.status(200).json(newSuggestion);
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: 'Error saving selected suggestion', error: error.message });
  }
};

// Function to fetch exercise types from the database
async function fetchExerciseTypes() {
  const types = await Suggestion.find().distinct('type');
  console.log('Fetched exercise types:', types); 
  return types;
}

// Function to fetch exercise difficulties from the database
async function fetchExerciseDifficulties() {
  const difficulties = await Suggestion.find().distinct('difficulty');
  return difficulties;
}



// Function to get exercise options (types and difficulties)
exports.getExerciseOptions = async (req, res) => {
  try {
    // Assuming fetchExerciseTypes and fetchExerciseDifficulties are functions 
    // that fetch the respective data. Replace these with your actual implementation.
    const types = await fetchExerciseTypes(); // Fetch types
    const difficulties = await fetchExerciseDifficulties(); // Fetch difficulties

    res.json({ types, difficulties });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error fetching exercise options', error: error.message });
  }
};


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