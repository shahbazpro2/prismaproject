/* eslint-disable react-hooks/exhaustive-deps */
import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react'
import Button from './common/buttons/Button'
import SelectField from './common/textFields/SelectField'
import TextField from './common/textFields/TextField'
import { GET_USERS } from '../graphql/query/GetUsers'
import { useLazyQuery, useMutation } from '@apollo/client'
import { GET_TAGS } from '../graphql/query/GetTags'
import { CREATEANIMATION } from '../graphql/mutation/CreateAnimation'
import { GET_ANIMATIONS } from '../graphql/query/GetAnimatons'

const AddAnimation = () => {
    const [getUsers, { data: queryData, loading: queryLoading }] = useLazyQuery(GET_USERS)
    const [getTags, { data: tagsData, loading: tagsLoading }] = useLazyQuery(GET_TAGS)
    const [createAnimation, { data, loading }] = useMutation(CREATEANIMATION, { refetchQueries: [GET_ANIMATIONS], onError: () => null })

    const [state, setState] = useState({
        userId: '',
        title: '',
        description: '',
        path: '',
        tagId: ''
    })

    const onChange = (e: ChangeEvent<HTMLInputElement & HTMLSelectElement>) => {
        const { name, value } = e.target
        setState({ ...state, [name]: value })
    }

    useEffect(() => {
        getTags()
        getUsers()
    }, [])


    const onSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()
        const res = await createAnimation({ variables: { ...state, userId: Number(state.userId), tagId: Number(state.tagId) } })
        if (!res.errors) {
            setState({
                userId: '',
                title: '',
                description: '',
                path: '',
                tagId: ''
            })
            alert('Animation created successfully')
        }
        console.log('state', state)
    }


    return (
        <div>
            <h1 className='mb-10'>Add Animation</h1>
            <form className='space-y-5' onSubmit={onSubmit}>
                <SelectField label="User" name="userId" value={state.userId} required={true} onChange={onChange}>
                    <option value={''}>Select user</option>
                    {queryData?.getUsers?.map(({ id, name }: { id: string, name: string }) => (
                        <option key={id} value={id}>{`${name}-${id}`}</option>
                    ))}
                </SelectField>
                <TextField
                    label="Title"
                    name="title"
                    required={true}
                    value={state.title}
                    onChange={onChange}
                />
                <TextField
                    label="Description"
                    name="description"
                    required={true}
                    multiline={true}
                    value={state.description}
                    rows={5}
                    onChange={onChange}
                />
                <TextField
                    label="File Path"
                    name="path"
                    required={true}
                    value={state.path}
                    onChange={onChange}
                />
                <SelectField label="Tags" name="tagId" value={state.tagId} required={true} onChange={onChange}>
                    <option value={''}>Select tag</option>
                    {tagsData?.getTags?.map(({ id, name }: { id: string, name: string }) => (
                        <option key={id} value={id}>{name}</option>
                    ))}
                </SelectField>

                <Button type="submit">Submit</Button>

            </form>
        </div>
    )
}

export default AddAnimation