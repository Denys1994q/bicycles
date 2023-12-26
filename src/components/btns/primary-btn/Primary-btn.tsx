import './Primary-btn.sass'
import React from 'react';

interface IPrimaryBtnProps {
    text: string,
    onClick?: any
}

const PrimaryBtn: React.FC<IPrimaryBtnProps> = ({text, onClick}) => {
    return (
        <button className='primary-btn' onClick={onClick}>
            {text}
        </button>
    )
}

export default PrimaryBtn