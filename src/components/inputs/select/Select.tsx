import './Select.sass'

interface ISelectProps {
    label: string
}

const Select = ({label}: ISelectProps) => {
    return (
        <div className='custom-select'>
            <label htmlFor={label}>{label}:</label>
            <select id={label}>
                <option value='available'>Available</option>
                <option value='unavailable'>Busy</option>
                <option value='pending'>Unavailable</option>
            </select>
        </div>
    )
}

export default Select;