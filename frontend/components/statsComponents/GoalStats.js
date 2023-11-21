import React from 'react'

const GoalStats = (props) => {

    const goals = props.userWithStats.checkAllGoals()

    console.log(goals)

  return (

    
    <div>GoalStats</div>
  )
}

export default GoalStats