import React, { FC } from 'react'

interface SubmitButtonProps {
    handleSubmit: () => void
}

const SubmitButton: FC<SubmitButtonProps> = ({ handleSubmit }) => {
    return (
        <div className='form_button_container'>
            <button
                className='form_button background_primary_color text_primary_color'
                onClick={handleSubmit}
            >
                Start Video Chat
        </button>
        </div>
    )
}

export default SubmitButton
