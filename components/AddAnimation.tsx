/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import Button from './common/buttons/Button'
import SelectField from './common/textFields/SelectField'
import TextField from './common/textFields/TextField'
import { GET_USERS } from '../graphql/query/GetUsers'
import { useLazyQuery } from '@apollo/client'
import { GET_TAGS } from '../graphql/query/GetTags'

const AddAnimation = () => {
    const [getUsers, { data: queryData, loading: queryLoading }] = useLazyQuery(GET_USERS)
    const [getTags, { data: tagsData, loading: tagsLoading }] = useLazyQuery(GET_TAGS)

    useEffect(() => {
        getTags()
        getUsers()
    }, [])

    return (
        <div>
            <h1 className='mb-10'>Add Animation</h1>
            <form className='space-y-5'>
                <SelectField label="User" name="user" required={true}>
                    {queryData?.getUsers?.map(({ id, name }: { id: string, name: string }) => (
                        <option key={id} value={id}>{`${name}-${id}`}</option>
                    ))}
                </SelectField>
                <TextField
                    label="Title"
                    name="title"
                    required={true}
                />
                <TextField
                    label="Description"
                    name="description"
                    required={true}
                    multiline={true}
                    rows={5}
                />
                <TextField
                    label="File Path"
                    name="filePath"
                    required={true}
                />
                <SelectField label="Tags" name="Tags" required={true}>
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