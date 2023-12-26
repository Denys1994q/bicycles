import './Card-form.sass'
import { useState } from 'react';
import TextInput from '../inputs/text-input/Text-input';
import Textarea from '../inputs/textarea/Textarea';
import PrimaryBtn from '../btns/primary-btn/Primary-btn';

const CardForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        type: '',
        color: '',
        wheel_size: '',
        price: '',
        id: '',
        description: ''
    });
    const [nameError, setNameError] = useState(false)
    const [colorError, setColorError] = useState(false)

    const onInputChange = (id: string, value: string) => {
        setFormData(prevState => ({
            ...prevState,
            [id]: value,
        }));
    }

    const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        validateForm()
        console.log(formData)
    }

    const validateForm = () => {
        formData['name'].length < 5 ? setNameError(true) : setNameError(false)
        formData['color'].length < 5 ? setColorError(true) : setColorError(false)
    }

    return (
        <form className='cardForm'>
            <TextInput id='name' placeholder='Name' onInputChange={onInputChange} error={nameError} />
            <TextInput id='type' placeholder='Type' onInputChange={onInputChange} />
            <TextInput id='color' placeholder='Color' onInputChange={onInputChange} error={colorError} />
            <TextInput id='wheel_size' placeholder='Wheel size' onInputChange={onInputChange} />
            <TextInput id='price' placeholder='Price' onInputChange={onInputChange} />
            <TextInput id='id' placeholder='ID (slug)' onInputChange={onInputChange} />
            <Textarea id='description' placeholder='Description' onTextareaChange={onInputChange}/>
            <div className='cardForm__btns'>
                <PrimaryBtn text='save' onClick={submitForm} />
                <PrimaryBtn text='clear' />
            </div>
        </form>
    )
}

export default CardForm;