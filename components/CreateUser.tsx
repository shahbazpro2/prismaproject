import { useMutation } from '@apollo/client'
import React, { ChangeEvent, SyntheticEvent, useState } from 'react'
import { CREATEUSER } from '../graphql/mutation/CreateUser'
import Button from './common/buttons/Button'
import TextField from './common/textFields/TextField'

const CreateUser = () => {
    const [createUser, { data, loading }] = useMutation(CREATEUSER, { onError: () => null })
    const [state, setState] = useState({ name: '', email: '' })

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setState({ ...state, [name]: value })
    }

    const onSubmit = (e: SyntheticEvent) => {
        e.preventDefault()
        createUser({ variables: { ...state } })
    }

    console.log('data', data, loading)

    return (
        <div>
            <h1 className='mb-10'>Create User</h1>
            <form className='space-y-5' onSubmit={onSubmit}>
                <TextField
                    label="Name"
                    name="name"
                    required={true}
                    onChange={onChange}
                />
                <TextField
                    label="Email"
                    type="email"
                    name="email"
                    required={true}
                    onChange={onChange}
                />

                <Button type="submit" disabled={loading}>Create</Button>
            </form>
        </div>
    )
}

export default CreateUser