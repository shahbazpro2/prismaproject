import React from 'react'
import TextField from './common/textFields/TextField'

const UserInput = () => {
    return (
        <div>
            <h1 className='mb-10'>Create User</h1>
            <TextField
                label="Name"
                name="name"
            />
        </div>
    )
}

export default UserInput