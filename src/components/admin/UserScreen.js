import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useForm from '../../hooks/useForm';
import {useNavigate} from 'react-router-dom';
import { removeError, setError } from '../../actions/uiActions';
import '../../styles/user.css';
import { userDeleteAsync, userEmailVerification, userUpdateAsync, userUploadProfilePicture } from '../../actions/userActions';
import Swal from 'sweetalert2';

const UserScreen = () => {
  const navigate=useNavigate();

  const [disabledNombre, setDisabledNombre] = useState(true);
  const [disabledContrasenna, setDisabledContrasenna] = useState(true);
  const [photoUrl, setPhotoUrl] = useState("");

  const nombreInput = useRef(null);
  const contrasennaInput = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(removeError());
  }, [dispatch]);

  const { msgError } = useSelector(state => state.ui);
  const { nombre: nombreAuth, verificado } = useSelector(state => state.auth);
  const { fotoUrl } = useSelector(state => state.auth);

  const [values, handleInputChange, reset] = useForm({
    nombre: '',
    contrasenna: '',
    contrasenna2: ''
  });
  const { nombre, contrasenna, contrasenna2 } = values;

  useEffect(() => {
    if (nombreAuth) {
      reset({ nombre: nombreAuth, contrasenna: '', contrasenna2: '' });
      setPhotoUrl(fotoUrl)
    } else {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nombreAuth]);

  const isValid = () => {
    if (nombre.length === 0) {
      dispatch(setError('El nombre es obligatorio'));
      return false;
    }
    else if (contrasenna !== contrasenna2) {
      dispatch(setError('Las contraseñas deben ser iguales'));
      return false;
    }
    return true;
  }

  const handleEnableNombre = () => {
    setDisabledNombre(false);
    setTimeout(() => {
      nombreInput.current.focus();
    }, 0);
  }

  const handleEnableContrasenna = () => {
    setDisabledContrasenna(false);
    setTimeout(() => {
      contrasennaInput.current.focus();
    }, 0);
  }

  const handleFile = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    dispatch(userUploadProfilePicture(formData)).then(url => setPhotoUrl(url));
  }

  const handlePicture = () => {
    document.querySelector('#fileSelector').click();
  }

  const handleSave = (e) => {
    e.preventDefault();

    if (isValid()) {
      dispatch(removeError());
      dispatch(userUpdateAsync(nombre, contrasenna, photoUrl));
    }
  }

  const handleDelete = () => {
    Swal.fire({
      title: 'Está seguro?',
      text: 'No podrá recuperar su cuenta una vez eliminada',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ff0000',
      cancelButtonColor: '#00ff00',
      confirmButtonText: 'Eliminar cuenta'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(userDeleteAsync());
      }
    });
  }

  const handleVerified = () => {
    dispatch(userEmailVerification());
    navigate('/');
  }

  return (
    <div className='animate__animated animate__pulse user-container'>
      <div className='user-form-container'>
        <form onSubmit={handleSave} className='user-form d-flex flex-column'>
          <div className='user-img-container align-self-center'>
            <img className='user-img' src={photoUrl ? photoUrl : 'assets/icons/fotousuario.png'} alt='' width='100%' height='100%' />
          </div>
          <input
            type='file'
            name='file'
            style={{ display: 'none' }}
            id='fileSelector'
            accept='image/*'
            onChange={handleFile}
          />
          <div className='btn btn-demo edit d-flex align-self-center btn-photo mt-3 mb-3' onClick={handlePicture}>
            <img src='assets/icons/camara.png' className='align-self-center' height='36px' alt='' />
            <p className='m-0 align-self-center'>Elegir foto</p>
          </div>

          <div className='form-group d-flex'>
            <input
              type='text'
              name='nombre'
              id='nombre'
              className='form-control user-input'
              placeholder='Nombre completo'
              disabled={disabledNombre}
              onChange={handleInputChange}
              value={nombre}
              ref={nombreInput}
            />
            <img src='assets/icons/editar.png' alt='' className='ml-1 edit' height='30px' onClick={handleEnableNombre} />
          </div>
          <div className='form-group d-flex'>
            <input
              type='password'
              name='contrasenna'
              id='contrasenna'
              className='form-control user-input'
              placeholder='Nueva contraseña'
              disabled={disabledContrasenna}
              onChange={handleInputChange}
              value={contrasenna}
              ref={contrasennaInput}
            />
            <img src='assets/icons/editar.png' alt='' className='ml-1 edit' height='30px' onClick={handleEnableContrasenna} />
          </div>
          <div className='form-group'>
            <input
              type='password'
              name='contrasenna2'
              className='form-control user-input'
              placeholder='Confirmar contraseña'
              disabled={disabledContrasenna}
              onChange={handleInputChange}
              value={contrasenna2}
            />
          </div>
          <div className='form-group'>
            {
              msgError && <div className='alert-error'>
                {msgError}
              </div>
            }
            <div className='d-flex align-items-end'>
              <button
                type='submit'
                className='btn btn-success btn-block'
              >Guardar</button>
              {
                !verificado &&
                <button
                  type='button'
                  className='btn btn-info btn-block ml-2'
                  onClick={handleVerified}
                >Verificar</button>
              }
            </div>
            <button
              type='button'
              className='btn btn-danger btn-block mt-2'
              onClick={handleDelete}
            >Eliminar cuenta</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UserScreen;