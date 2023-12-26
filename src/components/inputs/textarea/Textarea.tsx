import './Textarea.sass'
import React, { useState, ChangeEvent } from 'react';

interface ITextareaProps {
    id: string,
    placeholder?: string,
    onTextareaChange?: any
}

const Textarea: React.FC<ITextareaProps> = ({id, placeholder, onTextareaChange}) => {
    const [value, setValue] = useState('')

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const inputValue = event.target.value;
        setValue(inputValue)
        if (onTextareaChange) {
            onTextareaChange(id, inputValue)
        }
    };

    return (
        <>
            <textarea 
                value={value}
                onChange={handleChange}
                placeholder={placeholder} 
                className='textarea'>
            </textarea>
        </>
    )
}

export default Textarea