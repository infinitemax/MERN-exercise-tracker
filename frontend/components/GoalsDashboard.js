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


    const deleteGoalHandler = async (id) => {
        await goalsApiClinet.deleteGoal(id)
    }


  return (
    <div>
        <div className='flex flex-col justify-center'>
            <h1 className='mt-12 text-4xl font-bold text-center text-white'>{userInfo.username}'s goals</h1>
            {isAddingGoal &&
                <AddGoalModal
                    userInfo={userInfo}
                    toggleGoalModal={() => {toggleGoalModal()}}
                    handleGoalsUpdate={() => props.handleGoalsUpdate()}
                />
            }
            <button className='w-48 px-4 py-2 mx-auto mt-12 rounded-full bg-slate-800 hover:bg-slate-600 text-slate-200' onClick={() => { toggleGoalModal() }}>Add a goal</button>
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