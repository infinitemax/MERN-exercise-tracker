import React, { useState } from 'react';
import Suggestions from './Suggestions';

const Exercise = () => {
    const [selectedExercise, setSelectedExercise] = useState(null);

    const handleExerciseSelect = (exercise) => {
        console.log("Exercise selected:", exercise);
        setSelectedExercise(exercise);
    };

    return (
        <div className='p-5'>
            <Suggestions onSuggestionsFetched={handleExerciseSelect} />
          {selectedExercise ? (
            <>
              <div className="max-w-lg p-6 mx-auto mt-5 rounded-lg shadow-md bg-gradient-to-b from-white to-[#f2fff9]">
                <div className="flex flex-col items-center">
                    <div className="text-sm text-gray-700 uppercase">{selectedExercise.difficulty}</div>
                    <h1 className="text-2xl font-semibold">{selectedExercise.name}</h1>
                </div>
                <div className="mt-6">
                    <div className="flex items-center justify-between">
                        <div className="text-gray-600">Type:</div>
                        <div className="font-semibold capitalize">{selectedExercise.type}</div>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <div className="text-gray-600">Muscle Group:</div>
                        <div className="font-semibold capitalize">{selectedExercise.muscle}</div>
                    </div>
                    <div className="flex flex-col mt-4">
                        <div className="text-gray-600">Instructions:</div>
                        <div className="font-semibold capitalize">{selectedExercise.instructions}</div>
                        
                    </div>
                </div>
              </div>
            </>
          ) : (
            <p>No exercise selected</p>
          )}
          
        </div>
      );
  };



export default Exercise;
