/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react'
import Button from './common/buttons/Button'
import { useDropzone } from 'react-dropzone';
import TextField from './common/textFields/TextField'
import { MultiSelect } from "react-multi-select-component";
import { GET_USERS } from '../graphql/query/GetUsers'
import { useLazyQuery, useMutation } from '@apollo/client'
import { GET_TAGS } from '../graphql/query/GetTags'
import { CREATEANIMATION } from '../graphql/mutation/CreateAnimation'
import { GET_ANIMATIONS } from '../graphql/query/GetAnimatons'

const AddAnimation = () => {
    const [getUsers, { data: queryData, loading: queryLoading }] = useLazyQuery(GET_USERS)
    const [getTags, { data: tagsData, loading: tagsLoading }] = useLazyQuery(GET_TAGS)
    const [createAnimation, { data, loading }] = useMutation(CREATEANIMATION, { refetchQueries: [GET_ANIMATIONS], onError: () => null })
    const [selected, setSelected] = useState([]);
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({ multiple: false, accept: '.json' });

    console.log('acc', JSON.stringify(acceptedFiles[0]), acceptedFiles[0])

    const [state, setState] = useState({
        userId: '',
        title: '',
        description: '',
        path: '',
        tagId: ''
    })

    const options = [
        { label: "Grapes 🍇", value: "grapes" },
        { label: "Mango 🥭", value: "mango" },
        { label: "Strawberry 🍓", value: "strawberry" },
        { label: "Watermelon 🍉", value: "watermelon" },
        { label: "Pear 🍐", value: "pear", disabled: true },
        { label: "Apple 🍎", value: "apple" },
        { label: "Tangerine 🍊", value: "tangerine" },
        { label: "Pineapple 🍍", value: "pineapple" },
        { label: "Peach 🍑", value: "peach" }
    ];

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
            <h2 className='mb-10'>Add Lottie</h2>
            <form className='space-y-5' onSubmit={onSubmit}>
                <div>
                    <label htmlFor={"tags"} className="block text-sm font-medium text-gray-700 mb-1">
                        Tags
                    </label>
                    <MultiSelect
                        options={options}
                        value={selected}
                        onChange={setSelected}
                        labelledBy={"Tags"}
                    />
                </div>
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
                <div {...getRootProps({ className: `w-full h-[5rem] flex items-center justify-center mb-2 rounded-[7px] border-dashed border-2 cursor-pointer  border-[#D9D9D9] hover:border-blue-300` })}>
                    <input {...getInputProps()} />
                    <p className="subtitle-clr px-3">Drag 'n' drop file here, or click to select file</p>
                </div>
                {/* <TextField
                    label="File Path"
                    name="path"
                    required={true}
                    value={state.path}
                    onChange={onChange}
                /> */}

                {/*  <SelectField label="Tags" name="tagId" value={state.tagId} required={true} onChange={onChange}>
                    <option value={''}>Select tag</option>
                    {tagsData?.getTags?.map(({ id, name }: { id: string, name: string }) => (
                        <option key={id} value={id}>{name}</option>
                    ))}
                </SelectField> */}

                <Button type="submit">Submit</Button>

            </form>
        </div>
    )
}

export default AddAnimation