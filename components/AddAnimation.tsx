import React from 'react'
import Button from './common/buttons/Button'
import SelectField from './common/textFields/SelectField'
import TextField from './common/textFields/TextField'

const AddAnimation = () => {
    return (
        <div>
            <h1 className='mb-10'>Add Animation</h1>
            <form className='space-y-5'>
                <SelectField label="User" name="user" required={true}>
                    <option>user1</option>
                    <option>user2</option>
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
                    <option>op1</option>
                    <option>op2</option>
                </SelectField>

                <Button type="submit">Submit</Button>

            </form>
        </div>
    )
}

export default AddAnimation