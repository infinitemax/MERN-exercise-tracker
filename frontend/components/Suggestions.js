import React, { useState, useEffect } from 'react';
import apiClient from '@/apiClient'; // Make sure this points to your API client setup

const ExerciseSuggestionsForm = ({ onSuggestionsFetched }) => {
  const [formState, setFormState] = useState({
    name: '',
    type: '',
    muscle: '',
    difficulty: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const [types, setTypes] = useState([]);
  const [muscles, setMuscles] = useState([]);
  const [difficulties, setDifficulties] = useState([]);


  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await apiClient.getExerciseOptions(); // API call
        setTypes(response.data.types);
        setMuscles(response.data.muscles);
        setDifficulties(response.data.difficulties);
      } catch (error) {
        console.error('Failed to fetch exercise options:', error);
        // Handle error
      }
    };

    fetchOptions();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    try {
        // Call your API client to fetch the suggestions
        const response = await apiClient.getExerciseSuggestions({
            name: formState.name,
            type: formState.type,
            muscle: formState.muscle,
            difficulty: formState.difficulty,
        });
        console.log("API Response:", response.data);
        // Check if the response contains an array and it's not empty
        if (Array.isArray(response.data) && response.data.length > 0) {
            // Randomly select one exercise from the array
            const randomIndex = Math.floor(Math.random() * response.data.length);
            const selectedExercise = response.data[randomIndex];
            await apiClient.saveSelectedSuggestion(selectedExercise);
            
            // Pass the selected exercise up to the parent component or handle it here
            if (typeof onSuggestionsFetched === 'function') {
                onSuggestionsFetched(selectedExercise);
            }
        } else {
          throw new Error('No exercise found with name ' + formState.name)
            console.error('No exercises found');
            // Handle the case where no exercises are returned
        }
    } catch (error) {
        console.error('Error fetching exercise suggestions:', error);
        setErrorMessage(error.message);
        // Handle error
    }
};

  return (
    <div className="pt-20">
       {errorMessage && <div className="font-bold text-red-800 error-message">{errorMessage}</div>}
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="type">Exercise Type:</label>
        <select name="type" value={formState.type} onChange={handleInputChange}>
        <option value="">Select Type</option>
        {types.map(type => <option className='capitalize' key={type} value={type}>{type}</option>)}
      </select>
      </div>
      <div>
        <label htmlFor="muscle">Muscle:</label>
        <select name="muscle" value={formState.muscle} onChange={handleInputChange}>
    <option value="">Select Muscle</option>
    {muscles && muscles.length > 0 && 
      muscles.map((muscle) => (
        <option className="capitalize" key={muscle} value={muscle}>
          {muscle}
        </option>
      ))}
  </select>
      </div>
      <div>
        <label htmlFor="difficulty">Difficulty:</label>
        <select name="difficulty" value={formState.difficulty} onChange={handleInputChange}>
        <option value="">Select Difficulty</option>
        {difficulties.map(difficulty => <option className='capitalize' key={difficulty} value={difficulty}>{difficulty}</option>)}
      </select>
      </div>
      <button type="submit">Get Suggestions</button>
    </form>
    </div>
  );
};

export default ExerciseSuggestionsForm;
