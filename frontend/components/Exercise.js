import React, { useState } from 'react';
import Suggestions from './Suggestions'; // Adjust the import path as needed

const Exercise = () => {
    const [selectedExercise, setSelectedExercise] = useState(null);

    const handleExerciseSelect = (exercise) => {
        setSelectedExercise(exercise);
    };

    return (
        <div className='p-5'>
            <Suggestions onSuggestionsFetched={handleExerciseSelect} />
            {selectedExercise && (
                <div className='p-4 mt-5 border border-gray-800 rounded-lg bg-slate-300'>
                    <h2 className='font-bold text-center'>{selectedExercise.name}</h2>
                    <p className="p-2 text-gray-800 text-md">Type: {selectedExercise.type}</p>
                    <p className="p-2 text-gray-800 text-md">Muscle Group: {selectedExercise.muscle}</p>
                    <p className="p-2 text-gray-800 text-md">Difficulty: {selectedExercise.difficulty}</p>
                    <p className="p-2 text-gray-800 text-md">Instructions: {selectedExercise.instructions}</p>
                </div>
            )}
        </div>
    );
};

export default Exercise;
