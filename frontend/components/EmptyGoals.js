import React from 'react'

const EmptyGoals = () => {
    return (
        <div className='flex justify-center py-12'>
            <div className='p-8 bg-gradient-to-b from-white to-[#f2fff9] shadow-md rounded-lg text-slate-800 w-[600px]'>
                <h2 className='pb-6 text-xl text-center sm:text-3xl'>Your saved activities will appear here.</h2>
                <p className='pb-4 text-lg'>Time to get moving!</p>
                <p className='text-lg'>Press <strong className='text-teal-500'>record</strong> when you're ready.</p>
            </div>
        </div>
      )
}

export default EmptyGoals