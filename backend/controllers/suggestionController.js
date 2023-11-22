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

async function fetchExerciseMuscles() {
  const muscles = await Suggestion.find().distinct('muscle');
  return muscles;
}


// Function to get exercise options (types and difficulties)
exports.getExerciseOptions = async (req, res) => {
  try {
    const types = await fetchExerciseTypes(); // Fetch types
    const difficulties = await fetchExerciseDifficulties(); // Fetch difficulties
    const muscles = await fetchExerciseMuscles();
    res.json({ types, difficulties, muscles });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error fetching exercise options', error: error.message });
  }
};

exports.getLatestSuggestion = async (req, res) => {
  const userId = req.userId;
  console.log('Fetching latest suggestion for user:', userId);

  try {
    // Fetch the latest suggestion for the user
    const latestSuggestion = await Suggestion.findOne({ user: userId }).sort({ createdAt: -1 });
    console.log('Latest Suggestion:', latestSuggestion);
    res.json(latestSuggestion);
  } catch (error) {
    console.error('Error fetching latest suggestion:', error);
    res.status(500).json({ message: 'Error fetching latest suggestion', error: error.message });
  }
};


exports.getExerciseSuggestions = async (req, res) => {
  const { name, type, muscle, difficulty } = req.query;
  console.log("Received query params:", req.query);
  const userId = req.userId;
  const redisKey = `exercise:${name}:${type}:${muscle}:${difficulty}:${userId}`;

  try {
    console.log(`Checking Redis Cache for key: ${redisKey}`);
    const cachedData = await redisClient.get(redisKey);

    if (cachedData) {
      console.log('Retrieved data from Redis cache');
      const exercises = JSON.parse(cachedData);

      // Select a random exercise if it's an array
      if (Array.isArray(exercises) && exercises.length) {
        const selectedExercise = exercises[Math.floor(Math.random() * exercises.length)];
        return res.json(selectedExercise);
      } else {
        return res.json(exercises); // Handle cases where it's not an array
      }
    }

    console.log('Making API request');
    const apiKey = process.env.API_NINJAS_KEY;
    const apiUrl = 'https://api.api-ninjas.com/v1/exercises';
    const response = await axios.get(apiUrl, {
      headers: { 'X-Api-Key': apiKey },
      params: { name, type, muscle, difficulty },
    });

    console.log('Storing in Redis');
    await redisClient.setex(redisKey, 3600, JSON.stringify(response.data));

    console.log("-----> Response Data for New Suggestion Creation:", response.data);

    if (Array.isArray(response.data) && response.data.length) {
      const selectedExercise = response.data[Math.floor(Math.random() * response.data.length)];
      console.log("Selected Exercise:", selectedExercise);
  
      // Check if the same suggestion already exists in MongoDB
      const existingSuggestion = await Suggestion.findOne({
          ...selectedExercise,
          user: userId
      });
  
      if (existingSuggestion) {
          console.log('Retrieved existing suggestion from MongoDB');
          res.json(existingSuggestion);
      } else {
          // Save the new suggestion to MongoDB
          const newSuggestion = new Suggestion({
              ...selectedExercise,
              user: userId
          });
  
          await newSuggestion.save();
          console.log(`New suggestion saved to MongoDB with _id: ${newSuggestion._id}`);
  
          // Update the user's suggestions in MongoDB
          await User.findByIdAndUpdate(userId, {
              $push: { suggestions: newSuggestion._id }
          });
  
          console.log('Storing suggestion for user in MongoDB');
  
          res.json(selectedExercise);
      }
  } else {
      throw new Error('Received data is not an array or is empty');
  }
    
  } catch (error) {
    console.error('Error fetching exercise suggestions:', error);
    res.status(500).json({ message: 'Error fetching exercise suggestions', error: error.message });
  }
};
