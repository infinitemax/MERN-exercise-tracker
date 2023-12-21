import React from 'react'

const BrowserAlert = (props) => {
  return (
    <div className='p-8 bg-slate-800 text-slate-200'>
        <h2 className='text-4xl pt-4 pb-12'>Incompatible browser!</h2>
        <p className='text-xl font-light pb-4'>Apologies, but at present this app does not work with {props.browser}</p>
        <p className='text-xl font-light pb-8'>We recommend you try again with Chrome</p>
    </div>
  )
}

export default BrowserAlert