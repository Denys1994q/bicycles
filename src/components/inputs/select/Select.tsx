import "./Select.sass";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

interface ISelectProps {
    label?: string;
    options: string[];
    id: number,
    onSelect: (id: number, status: string) => void,
    activeOption?: string
}

const Select: React.FC<ISelectProps> = ({ label, id, options, activeOption, onSelect }: ISelectProps) => {
    const [selectedValue, setSelectedValue] = useState<string>("");

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newValue = event.target.value;
        setSelectedValue(newValue);
        onSelect(id, newValue);
    };

    return (
        <div className='custom-select'>
            <label htmlFor={label}>{label}:</label>
            <select id={label} value={activeOption ? activeOption : selectedValue} onChange={handleSelectChange}>
                {options.map(item => (
                    <option key={uuidv4()} value={item}>
                        {item.charAt(0).toUpperCase() + item.slice(1)}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;
