import React from 'react'

const TestComp = ({displayName, username, email, isEmailVerified}) => {
  return (
    <div>
        <div>
            <span>Name: {displayName.length > 30 ? displayName.slice(0,27).concat("...") : displayName}</span>
            <br/>
            <span>username: {username}</span>
            <br/>
            <span>email: {email}</span>
        </div>
        <br/>
        <div>
            Verified: <span>{isEmailVerified ? "Email verified" : "Email not verified"}</span>
        </div>
    </div>
  )
}

export default TestComp