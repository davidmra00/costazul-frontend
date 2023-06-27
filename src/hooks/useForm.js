import { useState } from 'react';


const useForm = ( initialState = {} ) => {
    
    const [values, setValues] = useState(initialState);

    const reset = (newState=initialState) => {
        setValues( newState );
        //console.log(newState)
    }


    const handleInputChange = ({ target }) => {
        /* console.log(target.name)
        console.log(target.value) */
        setValues({
            ...values,
            [ target.name ]: target.value
        });
        //console.log(values)
    }

    return [ values, handleInputChange, reset];

}

export default useForm;