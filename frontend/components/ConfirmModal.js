import React from 'react'

const ConfirmModal = (props) => {
  return (
    
    <div className='w-40 bg-gradient-to-b from-white to-[#f2fff9] border-2 border-teal-800 text-slate-800 absolute right-1 rounded-lg top-1 bottom-1'>
        <h3 className='text-lg font-semibold text-center'>Delete?</h3>
        <div className='flex justify-around'>
            <button className='w-16 text-white bg-teal-800 rounded-full hover:bg-teal-900'
                onClick={() => props.deleteModalHanadler(true)}>Yes</button>
            <button className='w-16 text-white rounded-full bg-sky-700 hover:bg-sky-800'
            onClick={() => props.deleteModalHanadler(false)}>No</button>
        </div>
    </div>
  )
}

export default ConfirmModal