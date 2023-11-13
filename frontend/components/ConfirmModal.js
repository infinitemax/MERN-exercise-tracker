import React from 'react'

const ConfirmModal = (props) => {
  return (
    <div className='w-56 bg-teal-500 border-2 border-teal-800 text-teal-100'>
        <h3>Are you sure you want to delete this activity?</h3>
        <button>Yes</button>
        <button>No</button>
    </div>
  )
}

export default ConfirmModal