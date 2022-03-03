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
import axios from 'axios'

const AddAnimation = () => {
    const [getUsers, { data: queryData, loading: queryLoading }] = useLazyQuery(GET_USERS)
    const [getTags, { data: tagsData, loading: tagsLoading }] = useLazyQuery(GET_TAGS)
    const [createAnimation, { data, loading }] = useMutation(CREATEANIMATION, { refetchQueries: [GET_ANIMATIONS], onError: () => null })
    const [tags, setTags] = useState([]);
    const [tagOptions, setTagOptions] = useState([])
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({ multiple: false, accept: '.json' });

    console.log('acc', JSON.stringify(acceptedFiles[0]), acceptedFiles[0])

    const [state, setState] = useState({
        userId: '',
        title: '',
        description: '',
    })

    const onChange = (e: ChangeEvent<HTMLInputElement & HTMLSelectElement>) => {
        const { name, value } = e.target
        setState({ ...state, [name]: value })
    }

    useEffect(() => {
        getTags()
        getUsers()
    }, [])

    useEffect(() => {
        if (tagsData?.getTags?.length) {
            setTagOptions(tagsData?.getTags?.map((tag: any) => { return { label: tag.name, value: tag.id } }))
        }
    }, [tagsData?.getTags])


    const onSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()
        if (!tags.length || !acceptedFiles.length) return alert("Tags or file are required")

        const formatedTags = tags.map((tg: any) => { return { id: Number(tg.value), name: tg.label } })

        const formData = new FormData()

        formData.append("file", acceptedFiles[0])
        formData.append("title", state.title)
        formData.append("description", state.description)

        formData.append("tags", JSON.stringify(formatedTags))

        axios.post("/api/animation", formData)
            .then(res => {
                console.log('res', res.data)
            })
            .catch(err => console.log(err))

    }

    console.log('tags', tagsData)
    return (
        <div>
            <h2 className='mb-10'>Add Lottie</h2>
            <form className='space-y-5' onSubmit={onSubmit}>
                <div>
                    <label htmlFor={"tags"} className="block text-sm font-medium text-gray-700 mb-1">
                        Tags
                    </label>
                    <MultiSelect
                        options={tagOptions}
                        value={tags}
                        onChange={setTags}
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