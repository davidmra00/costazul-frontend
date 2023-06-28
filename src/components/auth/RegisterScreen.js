import Swal from 'sweetalert2';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import validator from 'validator';
import axios from 'axios';
import '../../styles/login.css';
import { useGoogleLogin } from '@react-oauth/google';
import useForm from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { authGoogleLoginAsync, authRegisterAsync } from '../../actions/authActions';
import { removeError, setError } from '../../actions/uiActions';

const RegisterScreen = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(removeError());
    }, [dispatch]);

    const { msgError } = useSelector(state => state.ui);

    const [values, handleInputChange] = useForm({
        nombre: '',
        correo: '',
        contrasenna: '',
        contrasenna2: ''
    });
    const { nombre, correo, contrasenna, contrasenna2 } = values;

    const isValid = () => {
        if (nombre.length === 0) {
            dispatch(setError('El nombre es obligatorio'));
            return false;
        }
        else if (!validator.isEmail(correo)) {
            dispatch(setError('Este no es un correo válido'));
            return false;
        }
        else if (contrasenna !== contrasenna2) {
            dispatch(setError('Las contraseñas deben ser iguales'));
            return false;
        }
        else if (contrasenna.length < 8) {
            dispatch(setError('La contraseña debe tener al menos 8 caracteres'));
            return false;
        }
        return true;
    }

    const handleRegister = (e) => {
        e.preventDefault();

        if (isValid()) {
            dispatch(removeError());
            dispatch(authRegisterAsync(nombre, correo, contrasenna));
        }
    }

    const handleGoogleLogin=useGoogleLogin({
        onSuccess: async tokenResponse=>{
            const userInfo= await axios.get('https://www.googleapis.com/oauth2/v3/userinfo',{
                headers: {Authorization: `Bearer ${tokenResponse.access_token}`}
            });
            const {data}=userInfo;
            const {name,email}=data;
            
            dispatch(removeError());
            dispatch(authGoogleLoginAsync(name,email));  
        },
        onError:errorResponse=>{
            console.log(errorResponse);
            Swal.fire('Error','Error al acceder con Google', 'error');
        }
    });

    return (
        <div className='login-container'>
            <div className='container-form-1'>
                <div className='login-form-1'>
                    <div className='logo-container'>
                        <img src='assets/images/WhatsAppImage2023-04-29at10.11.19AM.jpeg' className='img-fluid' alt="" width="70%" height="70%" />
                    </div>
                    <h3>Registrarse</h3>
                    <form onSubmit={handleRegister}>
                        <div className='form-group'>
                            <input
                                type='text'
                                name='nombre'
                                className='form-control'
                                placeholder='Nombre'
                                onChange={handleInputChange}
                            />
                        </div>
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
                            <input
                                type='password'
                                name='contrasenna'
                                className='form-control'
                                placeholder='Contraseña'
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='form-group'>
                            <input
                                type='password'
                                name='contrasenna2'
                                className='form-control'
                                placeholder='Confirmar Contraseña'
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
                            >Registrarse</button>

                        </div>
                    </form>
                    <button
                        className='btn btn-block btn-primary btn-google'
                        onClick={handleGoogleLogin}
                    >
                        <div className='google-icon-container'>
                            <img className='btn-google-img' src='assets/icons/logogoogle.png' alt='' width='100%' height='100%' />
                        </div>
                        <p className='btn-google-text'>Continuar con google</p>
                    </button>
                    <Link to='/login' className='link mt-4'>Ya tienes una cuenta?Ingresar</Link>
                </div>
            </div>
        </div>
    )
}

export default RegisterScreen;