import React from "react"


export function Table({users}) {
    return <div>    
        {users?.map((user) => <p key={user.id}>{user.name}</p>)}
    </div>
}