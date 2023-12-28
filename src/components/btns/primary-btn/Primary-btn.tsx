import './Primary-btn.sass'
import React from 'react';

interface IPrimaryBtnProps {
    text: string,
    disabled?: boolean,
    loading?: boolean,
    onClick?: any
}

const PrimaryBtn: React.FC<IPrimaryBtnProps> = ({text, onClick, disabled, loading}) => {
    return (
        <button className='primary-btn' onClick={onClick} disabled={disabled || loading}>
            {text} <span>{loading ? '...' : ''}</span>
        </button>
    )
}

export default PrimaryBtn