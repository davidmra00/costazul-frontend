import React from 'react';
import Modal from 'react-modal';
import validator from 'validator';
import moment from 'moment';
import 'moment/locale/es';
import Swal from 'sweetalert2';
import '../../styles/modal.css';
import useForm from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { removeError, setError, uiCloseModal } from '../../actions/uiActions';
import { travelReservationEmailAsync } from '../../actions/travelActions';

Modal.setAppElement('#root');

const TravelModal = ({ nombre, verificado, lugar, fechaInicio, fechaFin, precio }) => {
  const inicio = moment(fechaInicio).locale('es').format('D [de] MMMM [de] YYYY');
  const fin = moment(fechaFin).locale('es').format('D [de] MMMM [de] YYYY');

  const { modalOpen, msgError } = useSelector(state => state.ui);

  const dispatch = useDispatch();

  const [values, handleInputChange, reset] = useForm({
    personas: '1',
    telefono: '',
    correo: '',
    comentario: ''
  });

  const { personas, telefono, correo, comentario } = values;

  const closeModal = () => {
    dispatch(uiCloseModal());
    reset();
  }

  const isValid = () => {
    if (!validator.isEmail(correo)) {
      dispatch(setError('Este no es un correo válido'));
      return false;
    }
    else if (!validator.isMobilePhone(telefono)) {
      dispatch(setError('Este no es un teléfono válido'));
      return false;
    }
    return true;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isValid()) {
      if (verificado) {
        dispatch(removeError());
        dispatch(travelReservationEmailAsync(nombre, lugar, precio, personas, telefono, correo, comentario));
      } else {
        Swal.fire('Verificar cuenta', 'Verifique su cuenta antes de continuar.Puede pedir el correo de verificación en su perfil', 'info');
      }
    }
  }

  return (
    <Modal
      isOpen={modalOpen}
      onRequestClose={closeModal}
      closeTimeoutMS={200}
      className='modale'
      overlayClassName='modal-fondo'
    >
      <h2 className='text-center text-primary'>Reservar</h2>
      <hr />
      <form
        className='container'
        onSubmit={handleSubmit}
      >
        <h4>Destino: {lugar}</h4>
        <h6>Fecha: {inicio} - {fin}</h6>
        <hr />
        <div className='d-flex'>
          <div className='form-group'>
            <label htmlFor='personas'>Cantidad de personas</label>
            <input
              className={`form-control`}
              type='number'
              min={1}
              name='personas'
              id='personas'
              style={{ width: '75%' }}
              value={(personas < 1) ? 1 : personas}
              onChange={handleInputChange}
            />
          </div>
          <h5>Precio total: {(personas < 1) ? precio : precio * personas}</h5>
        </div>
        <div className='form-group'>
          <label htmlFor='telefono'>Teléfono</label>
          <input
            className={`form-control`}
            type='tel'
            name='telefono'
            id='telefono'
            placeholder='Teléfono'
            value={telefono}
            onChange={handleInputChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='correo'>Correo</label>
          <input
            className={`form-control`}
            type='email'
            name='correo'
            id='correo'
            placeholder='Correo'
            value={correo}
            onChange={handleInputChange}
          />
        </div>
        <div className='form-group'>
          <textarea
            className='form-control'
            placeholder='Déjanos un comentario sobre la reserva'
            type='text'
            rows='5'
            name='comentario'
            style={{ resize: 'none' }}
            value={comentario}
            onChange={handleInputChange}
          ></textarea>
          <small id='emailHelp' className='form-text text-muted'>Información adicional</small>
        </div>
        {
          msgError && <div className='alert-error'>
            {msgError}
          </div>
        }
        <button
          type='submit'
          className='btn btn-outline-primary btn-block'
        >
          <i className='far fa-save'></i>
          <span> Reservar</span>
        </button>
      </form>
    </Modal>
  )
}

export default TravelModal;