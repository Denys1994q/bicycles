import './Textarea.sass'
import React, { useState, ChangeEvent } from 'react';

interface ITextareaProps {
    id: string,
    placeholder?: string,
    clearValue?: boolean,
    error?: boolean,
    errorMsg?: string,
    value?: string,
    onTextareaChange?: (id: string, value: string) => void
}

const Textarea: React.FC<ITextareaProps> = ({id, value, clearValue, placeholder, error, errorMsg, onTextareaChange}) => {

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const inputValue = event.target.value;
        if (onTextareaChange) {
            onTextareaChange(id, inputValue)
        }
    };

    return (
        <div>
            <textarea 
                value={value}
                onChange={handleChange}
                placeholder={placeholder} 
                className={error ? 'textarea textarea-error' : 'textarea'} >
            </textarea>
            {(error && errorMsg) && <p className='error-msg'>{errorMsg}</p>}
        </div>
    )
}

export default Textarea