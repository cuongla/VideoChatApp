import React, { ChangeEvent, FC } from 'react'

interface FormInputProps {
    username: string
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const FormInput: FC<FormInputProps> = ({ username, onChange }) => {
    return (
        <div className='form_input_container'>
            <input
                placeholder='Enter your name'
                type='text'
                value={username}
                onChange={onChange}
                className='form_input background_primary_color text_primary_color'
            />
        </div>
    )
}

export default FormInput
