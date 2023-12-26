import './Select.sass'

interface ISelectProps {
    label: string,
    options: string[]
}

const Select = ({label, options}: ISelectProps) => {

    return (
        <div className='custom-select'>
            <label htmlFor={label}>{label}:</label>
            <select id={label}>
                {options.map(item => (
                    <option key={item} value={item}>{item}</option>
                ))}
            </select>
        </div>
    );
}

export default Select;