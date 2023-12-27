import './Text-input.sass'
import React, { useState, ChangeEvent } from 'react';

interface ITextInputProps {
    isNumberType?: boolean,
    placeholder?: string,
    id: string,
    clearValue?: boolean,
    error?: boolean,
    errorMsg?: string,
    onInputChange?: any
}

const TextInput: React.FC<ITextInputProps> = ({id, isNumberType, clearValue, placeholder, error, errorMsg, onInputChange}) => {
    const [value, setValue] = useState('')

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        setValue(inputValue)
        if (onInputChange) {
            onInputChange(id, inputValue)
        }
    };

    return (
        <div>
            <input 
                id={id}
                type={isNumberType ? 'number' : 'text'} 
                className={error ? 'textInput textInput-error' : 'textInput'} 
                placeholder={placeholder}
                value={clearValue ? '' : value}
                onChange={handleChange} />
            {(error && errorMsg) && <p className='error-msg'>{errorMsg}</p>}
        </div>
    )
}

export default TextInput;