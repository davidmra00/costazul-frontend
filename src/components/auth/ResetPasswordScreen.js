import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authResetPasswordAsync } from '../../actions/authActions';
import { removeError, setError } from '../../actions/uiActions';
import useForm from '../../hooks/useForm';

const ResetPasswordScreen = ({ token }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(removeError());
  }, [dispatch]);

  const { msgError } = useSelector(state => state.ui);

  const [values, handleInputChange] = useForm({
    contrasenna: '',
    contrasenna2: '',
  });
  const { contrasenna, contrasenna2 } = values;

  const isValid = () => {
    if (contrasenna !== contrasenna2) {
      dispatch(setError('Las contraseñas deben ser iguales'));
      return false;
    }
    else if (contrasenna.length < 8) {
      dispatch(setError('La contraseña debe tener al menos 8 caracteres'));
      return false;
    }
    return true;
  }

  const handleReset = (e) => {
    e.preventDefault();

    if (isValid()) {
      dispatch(removeError());
      dispatch(authResetPasswordAsync(token, contrasenna));
    }
  }

  return (
    <div className='login-container'>
      <div className='container-form-1'>
        <div className='login-form-1'>
          <div className='logo-container'>
            <img src='assets/images/WhatsAppImage2023-04-29at10.11.19AM.jpeg' className='img-fluid' alt="" width="70%" height="70%" />
          </div>
          <div>
            <h3>Nueva contraseña</h3>
          </div>
          <form onSubmit={handleReset}>
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
                placeholder='Confirmar contraseña'
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
              >Aceptar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ResetPasswordScreen;