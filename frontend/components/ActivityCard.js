import React from 'react'
import format from 'date-fns/format'

const ActivityCard = (props) => {

    // capitalise activity type
    let title = props.activity.toUpperCase()


    // get date and format using date-fns
    const date = new Date(props.createdAt)
    const formattedDate = format(date, "dd/MM/yyyy")



  return (
    <div className='my-2 mx-auto px-4 py-2 rounded-md border-2 border-slate-800 bg-slate-700 flex flex-wrap text-slate-200 max-w-[600px] relative'>
        <h2>{title}</h2>
        <p className='mx-2'> | </p>
        <p className='font-light'>Duration: {props.duration}</p>
        <p className='mx-2'> | </p>
        <p className='font-light'>Intensity: {props.intensity}</p>
        <p className='absolute right-4 font-light'>{formattedDate}</p>

    </div>
  )
}

export default ActivityCard