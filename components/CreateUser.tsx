import React from 'react'
import Button from './common/buttons/Button'
import TextField from './common/textFields/TextField'

const CreateUser = () => {
    return (
        <div>
            <h1 className='mb-10'>Create User</h1>
            <form className='space-y-5'>
                <TextField
                    label="Name"
                    name="name"
                    required={true}
                />
                <TextField
                    label="Email"
                    type="email"
                    name="email"
                    required={true}
                />

                <Button type="submit">Create</Button>
            </form>
        </div>
    )
}

export default CreateUser