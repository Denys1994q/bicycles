import './Text-input.sass'
import React, { useState, ChangeEvent } from 'react';

interface ITextInputProps {
    isNumberType?: boolean,
    placeholder?: string,
    id: string,
    error?: boolean,
    errorMsg?: string,
    value: string | number,
    onInputChange?: (id: string, value: string) => void
}

const TextInput: React.FC<ITextInputProps> = ({id, value, isNumberType, placeholder, error, errorMsg, onInputChange}) => {

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        if (onInputChange) {
            onInputChange(id, inputValue)
        }
    };

    return (
        <div className='textInput-wrapper'>
            <input 
                id={id}
                type={isNumberType ? 'number' : 'text'} 
                className={error ? 'textInput textInput-error' : 'textInput'} 
                placeholder={placeholder}
                value={value}
                onChange={handleChange} />
            {(error && errorMsg) && <p className='error-msg'>{errorMsg}</p>}
        </div>
    )
}

export default TextInput;