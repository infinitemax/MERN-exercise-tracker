import React from 'react'
import format from 'date-fns/format'
import Image from 'next/image'
import apiClient from '@/apiClient'

const ActivityCard = (props) => {

    // capitalise activity type
    let title = props.activity


    // get date and format using date-fns
    const date = new Date(props.date)
    const formattedDate = format(date, "dd/MM/yyyy")
    
    
    // handler function to delete activity
    const deleteEntryHandler = async () => {
      await apiClient.deleteActivity(props._id)
    }


  return (
    <div>
      <div className='my-2 mx-auto px-4 py-2 rounded-md border-2 border-slate-800 bg-slate-700 flex flex-wrap text-slate-200 max-w-[600px] relative'>
          <h2>{title}</h2>
          <p className='mx-2'> | </p>
          <p className='font-light'>Duration: {props.duration}</p>
          <p className='mx-2'> | </p>
          <p className='font-light'>Intensity: {props.intensity}</p>
          <p className='absolute right-7 font-light'>{formattedDate}</p>
          <button
                    className="absolute right-2 top-2"
                    onClick={() => {
                      deleteEntryHandler()
                      props.handleActivityUpdate()
                      }}
                >
                    <Image
                        src="/close-icon.png"
                        width={15}
                        height={15}
                        alt="logo"
                    />
                </button>
      </div>
    </div>
  )
}

export default ActivityCard