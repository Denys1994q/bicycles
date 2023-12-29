import "./Card-form.sass";
import { useState, useEffect } from "react";
import TextInput from "../inputs/text-input/Text-input";
import Textarea from "../inputs/textarea/Textarea";
import PrimaryBtn from "../btns/primary-btn/Primary-btn";
import { IBicycle } from "../../store/slices/models/bicycle";

interface ICardFormProps {
    onSubmit: (data: IBicycle) => void;
    loading?: boolean;
    error?: boolean;
    errorMsg?: string;
}

const CardForm: React.FC<ICardFormProps> = ({ onSubmit, loading, error, errorMsg }) => {
    const [formData, setFormData] = useState({
        name: "",
        type: "",
        color: "",
        wheelSize: "" as any,
        price: "" as any,
        id: "" as any,
        description: "",
    });
    const [nameError, setNameError] = useState(false);
    const [nameIsDirty, setNameIsDirty] = useState(false);
    const [typeError, setTypeError] = useState(false);
    const [typeIsDirty, setTypeIsDirty] = useState(false);
    const [colorError, setColorError] = useState(false);
    const [colorIsDirty, setColorIsDirty] = useState(false);
    const [wheelSizeError, setWheelSizeError] = useState(false);
    const [wheelSizeIsDirty, setWheelSizeIsDirty] = useState(false);
    const [priceError, setPriceError] = useState(false);
    const [priceIsDirty, setPriceIsDirty] = useState(false);
    const [idError, setIdError] = useState(false);
    const [idIsDirty, setIdIsDirty] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);
    const [descriptionIsDirty, setDescriptionIsDirty] = useState(false);
    const [isDisabledSubmitBtn, setIsDisabledSubmitBtn] = useState(true);

    const onInputChange = (id: string, value: string) => {
        setFormData(prevState => ({
            ...prevState,
            [id]: value,
        }));
        id === "name" && setNameIsDirty(true);
        id === "type" && setTypeIsDirty(true);
        id === "color" && setColorIsDirty(true);
        id === "description" && setDescriptionIsDirty(true);
        id === "wheelSize" && setWheelSizeIsDirty(true);
        id === "price" && setPriceIsDirty(true);
        id === "id" && setIdIsDirty(true);
    };

    useEffect(() => {
        // setClearValue(false);
        validateForm();
    }, [formData]);

    const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const validateForm = () => {
        setNameError(nameIsDirty && formData["name"].length < 5);
        setTypeError(typeIsDirty && formData["type"].length < 5);
        setColorError(colorIsDirty && formData["color"].length < 5);
        setDescriptionError(descriptionIsDirty && formData["description"].length < 5);
        setWheelSizeError(wheelSizeIsDirty && formData["wheelSize"] <= 0);
        setPriceError(priceIsDirty && formData["price"] <= 0);
        setIdError(idIsDirty && formData["id"] <= 0);
    };

    useEffect(() => {
        const nameErr = !nameError && nameIsDirty;
        const typeErr = !typeError && typeIsDirty;
        const colorErr = !colorError && colorIsDirty;
        const descriptionErr = !descriptionError && descriptionIsDirty;
        const wheelSizeErr = !wheelSizeError && wheelSizeIsDirty;
        const priceErr = !priceError && priceIsDirty;
        const idErr = !idError && idIsDirty;

        const hasErrors = nameErr && typeErr && colorErr && descriptionErr && wheelSizeErr && priceErr && idErr;

        if (hasErrors) {
            setIsDisabledSubmitBtn(false);
        } else {
            setIsDisabledSubmitBtn(true);
        }
    }, [
        nameError,
        typeError,
        colorError,
        descriptionError,
        wheelSizeError,
        wheelSizeIsDirty,
        priceError,
        priceIsDirty,
        idError,
        idIsDirty,
    ]);

    const clearForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormData({
            name: "",
            type: "",
            color: "",
            wheelSize: 0,
            price: 0,
            id: 0,
            description: " ",
        });
        // помилки забрати
        // description
        setIsDisabledSubmitBtn(true);
    };

    return (
        <form className='cardForm'>
            <TextInput
                id='name'
                placeholder='Name'
                value={formData['name']}
                onInputChange={onInputChange}
                error={nameError}
                errorMsg='Min 5 letters'
            />
            <TextInput
                id='type'
                value={formData['type']}
                placeholder='Type'
                onInputChange={onInputChange}
                error={typeError}
                errorMsg='Min 5 letters'
            />
            <TextInput
                id='color'
                value={formData['color']}
                placeholder='Color'
                onInputChange={onInputChange}
                error={colorError}
                errorMsg='Min 5 letters'
            />
            <TextInput
                isNumberType
                value={formData['wheelSize']}
                id='wheelSize'
                placeholder='Wheel size'
                error={wheelSizeError}
                errorMsg='Field is required'
                onInputChange={onInputChange}
            />
            <TextInput
                isNumberType
                value={formData['price']}
                id='price'
                placeholder='Price'
                error={priceError}
                errorMsg='Field is required'
                onInputChange={onInputChange}
            />
            <TextInput
                isNumberType
                value={formData['id']}
                id='id'
                placeholder='ID (slug)'
                error={idError}
                errorMsg='Field is required'
                onInputChange={onInputChange}
            />
            <div className='textareaWrapper'>
                <Textarea
                    id='description'
                    value={formData['description']}
                    placeholder='Description'
                    onTextareaChange={onInputChange}
                    error={descriptionError}
                    errorMsg='Min 5 letters'
                />
            </div>
            <div className='cardForm__btns'>
                <PrimaryBtn text='save' onClick={submitForm} disabled={isDisabledSubmitBtn} loading={loading} />
                <PrimaryBtn text='clear' onClick={clearForm} />
            </div>
            {error && <p className='error'>{errorMsg ? errorMsg : "Sorry, something is wrong..."}</p>}
        </form>
    );
};

export default CardForm;
