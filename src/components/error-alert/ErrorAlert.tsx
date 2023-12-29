import { useState, useEffect } from "react";
import "./ErrorAlert.sass";

const ErrorAlert = () => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsVisible(false);
        }, 3000);

        return () => clearTimeout(timeout);
    }, []);

    return isVisible ? <h4 className='error-alert'>Error. Sorry, something is wrong...</h4> : null;
};

export default ErrorAlert;
