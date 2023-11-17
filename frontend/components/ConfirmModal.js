import React from 'react'

const ConfirmModal = (props) => {
  return (
    <div className='w-40 bg-teal-500 border-2 border-teal-800 text-teal-100 absolute right-1 rounded-lg px-2 py-1 top-1'>
        <h3 className='text-center'>Delete?</h3>
        <div className='flex justify-between'>
            <button className='bg-teal-800 hover:bg-teal-900 rounded-full w-16 '
                onClick={() => props.deleteModalHanadler(true)}>Yes</button>
            <button className='bg-sky-700 hover:bg-sky-800 rounded-full w-16'
            onClick={() => props.deleteModalHanadler(false)}>No</button>
        </div>
    </div>
  )
}

export default ConfirmModal