import React from 'react'

const ActivityRecorder = () => {
  return (
    <div className='relative flex justify-center'>
        <div className='md:w-96 bg-slate-200 h-48 absolute mt-36 z-10'>
            <h2 className='text-2xl text-slate-700'>Record an activity</h2>
            <ul className='activity-btns'>
                <li>
                    <input type="radio" id="run-btn" name="activity-btn"/>
                    <label htmlFor="run-btn">Run</label>
                </li>
                <li>
                    <input type="radio" id="cylce-btn" name="activity-btn"/>
                    <label htmlFor="cylce-btn">Cycle</label>
                </li>
                <li>
                    <input type="radio" id="weights-btn" name="activity-btn"/>
                    <label htmlFor="weights-btn">Weights</label>
                </li>
                <li>
                    <input type="radio" id="other-btn" name="activity-btn"/>
                    <label htmlFor="other-btn">Other</label>
                </li>
                <li>
                    <input type="text" id="other-input" name="other-input" />
                </li>
            </ul>
        </div>
    </div>
  )
}

export default ActivityRecorder