import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import validator from 'validator';
import '../../styles/login.css';
import {useDispatch,useSelector} from 'react-redux';
import useForm from '../../hooks/useForm';
import { authForgetPasswordAsync } from '../../actions/authActions';
import { removeError, setError } from '../../actions/uiActions';

const ForgetPasswordScreen = () => {
    const dispatch=useDispatch();

    useEffect(()=>{
        dispatch(removeError());
    },[dispatch]);

    const {msgError}=useSelector(state=>state.ui);

    const [values,handleInputChange]=useForm({
        correo:''
    });
    const {correo}=values;

    const isValid=()=>{
        if(!validator.isEmail(correo)){
          dispatch(setError('Este no es un correo válido'));
          return false;
        }
        return true;
    }

    const handleLogin=(e)=>{
        e.preventDefault();

        if(isValid()){
            dispatch(removeError());
            dispatch(authForgetPasswordAsync(correo));
        }  
    }
    return (
        <div className='login-container'>
            <div className='container-form-1'>
                <div className='login-form-1'>
                    <div className='logo-container'>
                        <img src='/assets/images/WhatsAppImage2023-04-29at10.11.19AM.jpeg' className='img-fluid' alt=""  width="70%" height="70%" />
                    </div>
                    <h3>Recuperar contraseña</h3>
                    <form onSubmit={handleLogin}>
                        <div className='form-group'>
                            <input
                                type='text'
                                name='correo'
                                className='form-control'
                                placeholder='Correo'
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='form-group'>
                        {
                            msgError && <div className='alert-error'>
                            {msgError}
                            </div>
                        }
                            <button
                                type='submit'
                                className='btn btn-primary btn-block'
                            >Recuperar</button>
                        </div>
                        <div className='d-flex flex-column mt-5'>
                            <Link to='/login' className='link'>Ingresar</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ForgetPasswordScreen;