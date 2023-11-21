import React from 'react'
import { useState } from "react"
import AddGoalModal from './AddGoalModal'
import GoalCard from './GoalCard'
import apiClient from '@/apiClient'
import goalsApiClinet from '@/goalsApiClinet'

const GoalsDashboard = (props) => {
    const { userInfo } = props
    const { goals } = userInfo

    // opening and closing goal modal:
    const [isAddingGoal, setIsAddingGoal] = useState(false)
    const toggleGoalModal = () => {
        setIsAddingGoal(!isAddingGoal)
    }

    // get user's goals
    goals.forEach(goal => {
        console.log("hi there");
        console.log(goal)})

    const deleteGoalHandler = async (id) => {
        await goalsApiClinet.deleteGoal(id)
    }


  return (
    <div>
        <div className='flex flex-col justify-center'>
            <h1 className='text-4xl text-center mt-12'>{userInfo.username}'s goals</h1>
            {isAddingGoal &&
                <AddGoalModal
                    userInfo={userInfo}
                    toggleGoalModal={() => {toggleGoalModal()}}
                    handleGoalsUpdate={() => props.handleGoalsUpdate()}
                />
            }
            <button className='bg-teal-700 hover:bg-teal-800 px-4 py-2 border-2 border-teal-500 rounded-full text-slate-200 w-48 mx-auto mt-12' onClick={() => { toggleGoalModal() }}>Add a goal</button>
        </div>
            <div className='flex flex-wrap justify-center gap-8 pt-8'>
                {goals.map(goal => {
                    return (
                        <GoalCard
                            key={goal._id}
                            goal={goal}
                            deleteGoalHandler={() => deleteGoalHandler(goal._id)}
                            handleGoalsUpdate={() => props.handleGoalsUpdate()}
                        />
                    )
                })}
            </div>
    </div>
  )
}

export default GoalsDashboard