import React, { useState, useEffect } from 'react';
import apiClient from '@/apiClient'; // Make sure this points to your API client setup

const Suggestions = ({ onSuggestionsFetched }) => {
  const [formState, setFormState] = useState({
    name: '',
    type: '',
    muscle: '',
    equipment: '',
    difficulty: '',
    instructions: '',
    
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [types, setTypes] = useState([]);
  const [muscles, setMuscles] = useState([]);
  const [difficulties, setDifficulties] = useState([]);
  const [currentSuggestion, setCurrentSuggestion] = useState(null);
  
  useEffect(() => {
    const fetchLatestSuggestion = async () => {
      try {
        const response = await apiClient.getLatestSuggestion();
        console.log("Latest suggestion fetched:", response.data);
        if (response && response.data) {
          setCurrentSuggestion(response.data);
          if (onSuggestionsFetched) {
            onSuggestionsFetched(response.data);
          }
        }
      } catch (error) {
        console.error('Error fetching latest suggestion:', error);
      }
    };
  
    fetchLatestSuggestion();
  }, []);
  



  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await apiClient.getExerciseOptions();
        setTypes(response.data.types);
        setMuscles(response.data.muscles);
        setDifficulties(response.data.difficulties);
      } catch (error) {
        console.error('Failed to fetch exercise options:', error);
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
        const response = await apiClient.getExerciseSuggestions({
            name: formState.name,
            type: formState.type,
            muscle: formState.muscle,
            equipment: formState.equipment,
            difficulty: formState.difficulty,
        });
        console.log("API Response:", response.data);

        if (response.data) {
            setCurrentSuggestion(response.data);
            if (onSuggestionsFetched) {
                onSuggestionsFetched(response.data);
            }
        } else {
            throw new Error('No exercise found with name ' + formState.name);
        }
    } catch (error) {
        console.error('Error fetching exercise suggestions:', error);
        setErrorMessage(error.message || 'Error fetching exercise suggestions');
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
      <button type="submit" className="px-4 py-2 font-semibold text-white rounded-full bg-slate-950 hover:bg-blue-700">
          Generate Suggestion 
        </button>
        
    </form>
    </div>
  );
};

export default Suggestions;


