import React, { useState } from 'react'
import format from 'date-fns/format'
import Image from 'next/image'
import apiClient from '@/apiClient'


const ActivityCard = (props) => {

    const [showNotes, setShowNotes] = useState(false)


    // capitalise activity type
    let title = props.activity.split("")[0].toUpperCase() + props.activity.slice(1);

    // get date and format using date-fns
    const date = new Date(props.date)
    const formattedDate = format(date, "dd/MM/yyyy")

    // handle confirm delete
    const [clickCount, setClickCount] = useState(0)

    const handleDeleteClick = () => {
      setClickCount(clickCount + 1)
      if (clickCount > 1) {
        return props.deleteEntryHandler()
      }
      console.log("hello")
    }
    


  return (
    <div>
      <div className='my-2 mx-auto px-4 py-2 rounded-md border-2 border-slate-800 bg-slate-700 text-slate-200 max-w-[600px] relative'>
          <div className='flex flex-wrap '>
            <h2>{title}</h2>
            <p className='mx-2'> | </p>
            <p className='font-light'>Duration: {props.duration}</p>
            <p className='mx-2'> | </p>
            <p className='font-light'>Intensity: {props.intensity}</p>
            <p className='absolute right-7 font-light'>{formattedDate}</p>
            <button
                      className="absolute right-2 top-2"
                      onClick={() => {
                        handleDeleteClick()
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
      <div>
        <button onClick={() => setShowNotes(!showNotes)}>...</button>
      </div>
      {showNotes && <p>{props.notes}</p>}
      </div>
    </div>
  )
}

export default ActivityCard