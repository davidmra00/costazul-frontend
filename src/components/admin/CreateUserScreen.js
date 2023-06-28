import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useForm from '../../hooks/useForm';
import validator from 'validator';
import { useNavigate } from 'react-router-dom';
import { removeError, setError } from '../../actions/uiActions';
import '../../styles/user.css';
import { userCreatebyAdminAsync, userGetUsersAsync, userUpdatebyAdminAsync, userUploadProfilePicture } from '../../actions/userActions';
import { useParams } from 'react-router-dom';

const CreateUserScreen = () => {
  const navigate=useNavigate();

  const [disabledNombre, setDisabledNombre] = useState(true);
  const [disabledContrasenna, setDisabledContrasenna] = useState(true);
  const [disabledCorreo, setDisabledCorreo] = useState(true);

  const [users, setUsers] = useState([]);
  const [admin, setAdmin] = useState(false);
  const [verificado, setVerificado] = useState(false);
  const [photoUrl, setPhotoUrl] = useState("");

  const nombreInput = useRef(null);
  const contrasennaInput = useRef(null);
  const correoInput = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userGetUsersAsync()).then((users) => setUsers(users));
  }, [dispatch]);

  useEffect(() => {
    dispatch(removeError());
  }, [dispatch]);

  const { msgError } = useSelector(state => state.ui);

  const { id } = useParams();

  const user = users.find(user => user._id === id);

  const [values, handleInputChange, reset] = useForm({
    nombre: '',
    contrasenna: '',
    contrasenna2: '',
    correo: ''
  });
  const { nombre, contrasenna, contrasenna2, correo } = values;

  useEffect(() => {
    if (user) {
      reset({ nombre: user.nombre, contrasenna: '', contrasenna2: '', correo: user.correo });
      setAdmin(user.admin);
      setVerificado(user.verificado);
      setPhotoUrl(user.fotoUrl)
      setDisabledNombre(true);
      setDisabledContrasenna(true);
      setDisabledCorreo(true);
      
    } else {
      reset();
      setDisabledNombre(false);
      setDisabledContrasenna(false);
      setDisabledCorreo(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const isValid = () => {
    if (nombre.length === 0) {
      dispatch(setError('El nombre es obligatorio'));
      return false;
    }
    else if (contrasenna !== contrasenna2) {
      dispatch(setError('Las contraseñas deben ser iguales'));
      return false;
    }
    else if (!validator.isEmail(correo)) {
      dispatch(setError('Este no es un correo válido'));
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

  const handleEnableCorreo = () => {
    setDisabledCorreo(false);
    setTimeout(() => {
      correoInput.current.focus();
    }, 0);
  }

  const handleFile = (e) => {
    const file = e.target.files[0];
    const formData=new FormData();
    formData.append('file',file);
    dispatch(userUploadProfilePicture(formData)).then(url=>setPhotoUrl(url));
  }

  const handlePicture = () => {
    document.querySelector('#fileSelector').click();
  }

  const handleSave = (e) => {
    e.preventDefault();

    if(user){
      if (isValid()) {
        dispatch(removeError());
        dispatch(userUpdatebyAdminAsync( id, nombre, correo, contrasenna, admin, verificado,photoUrl ));
        navigate('/admin/usuarios');
      }
    }else{
      if (isValid()) {
        dispatch(removeError());
        dispatch(userCreatebyAdminAsync(nombre, correo, contrasenna, admin, verificado,photoUrl));
        reset();
        setPhotoUrl(undefined);
      }
    }
  }

  return (
    <div className='animate__animated animate__pulse user-container'>
      <div className='user-form-container'>
        <form onSubmit={handleSave} className='user-form d-flex flex-column'>
          <div className='user-img-container align-self-center admin-img-container'>
            <img className='user-img' src={!!photoUrl?photoUrl:'assets/icons/fotousuario.png'} alt='' width='100%' height='100%' />
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
            {
              user && 
              <img src='assets/icons/editar.png' alt='' className='ml-1 edit' height='30px' onClick={handleEnableNombre} />
            }
          </div>
          <div className='form-group d-flex'>
            <input
              type='email'
              name='correo'
              id='correo'
              className='form-control user-input'
              placeholder='Correo'
              disabled={disabledCorreo}
              onChange={handleInputChange}
              value={correo}
              ref={correoInput}
            />
            {
              user && 
              <img src='assets/icons/editar.png' alt='' className='ml-1 edit' height='30px' onClick={handleEnableCorreo} />
            }
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
            {
              user && 
              <img src='assets/icons/editar.png' alt='' className='ml-1 edit' height='30px' onClick={handleEnableContrasenna} />
            }
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
          <div className='d-flex justify-content-between'>
            <div className='form-group'>
              <input
                type='checkbox'
                id='admin'
                name='admin'
                onChange={()=>setAdmin(!admin)}
                checked={admin}
              />
              <label className='ml-2' htmlFor='admin'>Admin</label>
            </div>
            <div className='form-group'>
              <input
                type='checkbox'
                name='verificado'
                id='verificado'
                onChange={()=>setVerificado(!verificado)}
                checked={verificado}
              />
              <label className='ml-2' htmlFor='verificado'>Verificado</label>
            </div>
          </div>
          <div className='form-group'>
            {
              msgError && <div className='alert-error'>
                {msgError}
              </div>
            }
            {
              user?
                <button
                  type='submit'
                  className='btn btn-success btn-block'
                >Guardar</button>
               :<button
                type='submit'
                className='btn btn-success btn-block'
              >Crear Usuario</button>
            }
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateUserScreen;