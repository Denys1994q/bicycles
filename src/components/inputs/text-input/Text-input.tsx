import './Text-input.sass'
import React, { useState, ChangeEvent } from 'react';

interface ITextInputProps {
    placeholder?: string,
    id: string,
    error?: boolean,
    onInputChange?: any
}

const TextInput: React.FC<ITextInputProps> = ({id, placeholder, error, onInputChange}) => {
    const [value, setValue] = useState('')

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        setValue(inputValue)
        if (onInputChange) {
            onInputChange(id, inputValue)
        }
    };

    return (
        <>
            {error && 12}
            <input 
            id={id}
            type="text" 
            className='textInput' 
            placeholder={placeholder}
            value={value}
            onChange={handleChange} />
        </>
    )
}

export default TextInput;