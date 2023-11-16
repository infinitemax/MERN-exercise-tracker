import React from 'react'
import { useState } from "react"
import AddGoalModal from './AddGoalModal'

const GoalsDashboard = (props) => {
    const { userInfo } = props

    // opening and closing goal modal:
    const [isAddingGoal, setIsAddingGoal] = useState(false)
    const toggleGoalModal = () => {
        setIsAddingGoal(!isAddingGoal)
    }


  return (
    <div>
        <h1 className='text-2xl'>{userInfo.username}'s goals</h1>
        <button className='bg-teal-700 hover:bg-teal-800 px-4 py-2 border-2 border-teal-500 rounded-full text-slate-200' onClick={() => { toggleGoalModal() }}>Add a goal</button>

        {isAddingGoal && 
            <AddGoalModal 
                toggleGoalModal={() => {toggleGoalModal()}}
            />
        }
    </div>
  )
}

export default GoalsDashboard