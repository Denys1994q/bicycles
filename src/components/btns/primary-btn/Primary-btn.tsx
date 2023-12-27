import './Primary-btn.sass'
import React from 'react';

interface IPrimaryBtnProps {
    text: string,
    disabled?: boolean,
    onClick?: any
}

const PrimaryBtn: React.FC<IPrimaryBtnProps> = ({text, onClick, disabled}) => {
    return (
        <button className='primary-btn' onClick={onClick} disabled={disabled}>
            {text}
        </button>
    )
}

export default PrimaryBtn