import './Textarea.sass'
import React, { useState, ChangeEvent } from 'react';

interface ITextareaProps {
    id: string,
    placeholder?: string,
    error?: boolean,
    errorMsg?: string,
    onTextareaChange?: any
}

const Textarea: React.FC<ITextareaProps> = ({id, placeholder, error, errorMsg, onTextareaChange}) => {
    const [value, setValue] = useState('')

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const inputValue = event.target.value;
        setValue(inputValue)
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