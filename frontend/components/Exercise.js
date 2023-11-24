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
          <div className="max-w-lg p-6 mx-auto mt-5 rounded-4xl shadow-md bg-gradient-to-b from-white to-[#f2fff9] flex flex-col justify-between h-full">
              {selectedExercise ? (
                  <div>
                      <div className="flex flex-col items-start space-y-3">
                          <div className="bg-blue-100 text-slate-800 text-xs font-semibold px-2.5 py-0.5 rounded uppercase">{selectedExercise.difficulty}</div>
                          <h1 className="text-2xl font-semibold">{selectedExercise.name}</h1>
                      </div>
                      <div className="mt-6">
                          <div className="flex flex-col justify-between mt-6">
                              <div className="mb-1 text-gray-600">Type:</div>
                              <div className="font-semibold capitalize">{selectedExercise.type}</div>
                          </div>
                          <div className="flex flex-col justify-between mt-6">
                              <div className="mb-1 text-gray-600">Muscle Group:</div>
                              <div className="font-semibold capitalize">{selectedExercise.muscle}</div>
                          </div>
                          <div className="flex flex-col mt-6">
                              <div className="mb-1 text-gray-600">Instructions:</div>
                              <div className="font-semibold capitalize">{selectedExercise.instructions}</div>
                          </div>
                      </div>
                  </div>
              ) : null}
              
            
              <div className="flex flex-col items-center justify-center h-full">
                  <Suggestions onSuggestionsFetched={handleExerciseSelect} />
              </div>
          </div>
      </div>
  );
};


export default Exercise;
