"use client"
import React from 'react'
import { useState } from "react"

const Slider = ({title, min, max}) => {

    const [value, setValue] = useState(1);

    const handleSliderChange = (e) => {
        setValue(e.target.value)
    }
    
  return (
    <div>
        <div className='value'>{title}: {value}</div>
        <input type='range' min={min} max={max} value={value} onChange={(e) => {handleSliderChange(e)}} />
    </div>
  )
}

export default Slider