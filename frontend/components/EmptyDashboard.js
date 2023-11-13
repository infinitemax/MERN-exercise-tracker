import React from 'react'

const EmptyDashboard = () => {
  return (
    <div className='flex justify-center'>
        <div className='p-8 bg-slate-600 border-4 border-slate-700 rounded-lg text-slate-200 w-[600px]'>
            <h2 className='text-center text-xl sm:text-3xl pb-6'>Your saved activities will appear here.</h2>
            <p className='text-lg pb-4'>Time to get moving!</p>
            <p className='text-lg'>Press <strong className='text-teal-500'>record</strong> when you're ready.</p>
        </div>
    </div>
  )
}

export default EmptyDashboard