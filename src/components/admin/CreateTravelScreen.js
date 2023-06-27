import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/es';
import validator from 'validator';
import { travelCreateTravelAsync, travelLoadTravelsAsync, travelUpdateTravelAsync, travelUploadTravelPicture } from '../../actions/travelActions';
import '../../styles/Viaje.css';
import useForm from '../../hooks/useForm';
import { removeError, setError } from '../../actions/uiActions';
import TravelDetailPhotoAdmin from './TravelDetailPhotoAdmin';

const CreateTravelScreen = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [disponible, setDisponible] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [incluye, setIncluye] = useState([]);
  const [noIncluye, setNoIncluye] = useState([]);

  const [values, handleInputChange, reset] = useForm({
    precio: '',
    desde: '',
    hasta: '',
    lugar: '',
    descripcion: ''
  });

  const { precio, desde, hasta, lugar, descripcion } = values;

  useEffect(() => {
    dispatch(travelLoadTravelsAsync());
  }, [dispatch]);

  const { id } = useParams();

  const { travels } = useSelector(state => state.travel);
  const travel = travels.find(travel => travel._id === id);

  const { msgError } = useSelector(state => state.ui);

  const handleChangeIncluye = (e, index) => {
    const newIncluye = [...incluye];
    newIncluye[index] = e.target.value;
    setIncluye(newIncluye);
  }

  const handleChangeNoIncluye = (e, index) => {
    const newNoIncluye = [...noIncluye];
    newNoIncluye[index] = e.target.value;
    setNoIncluye(newNoIncluye);
  }

  const handleAddIncluye = () => {
    setIncluye([...incluye, '']);
  }

  const handleAddNoIncluye = () => {
    setNoIncluye([...noIncluye, '']);
  }

  const handleChangePhoto = (url, index) => {
    const newPhotos = [...photos];
    newPhotos[index] = url;
    setPhotos(newPhotos);
  }

  useEffect(() => {
    if (travel) {
      reset({
        precio: travel.precio,
        desde: travel.fechaInicio.slice(0, 10),
        hasta: travel.fechaFin.slice(0, 10),
        lugar: travel.lugar,
        descripcion: travel.descripcion
      });
      setDisponible(travel.disponibilidad);
      setIncluye(travel.incluye);
      setNoIncluye(travel.noIncluye);
      setPhotos(travel.fotoUrl);
    } else {
      reset();
      setIncluye(['']);
      setNoIncluye(['']);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [travel]);

  const gallery = [1, 2, 3, 4];

  const isValid = () => {
    if (precio.length === 0 || !validator.isNumeric(precio.toString())) {
      dispatch(setError('El precio es obligatorio y debe ser un número'));
      return false;
    }
    else if (lugar.length === 0) {
      dispatch(setError('El lugar es obligatorio'));
      return false;
    }
    else if (descripcion.length === 0) {
      dispatch(setError('La descripción es obligatoria'));
      return false;
    }
    else if (!moment(desde, 'YYYY-MM-DD', true).isValid()) {
      dispatch(setError('La fecha de inicio es obligatoria'));
      return false;
    }
    else if (!moment(hasta, 'YYYY-MM-DD', true).isValid()) {
      dispatch(setError('La fecha de fin es obligatoria'));
      return false;
    }
    else if (incluye.length === 0 || incluye.every(e => e === '')) {
      dispatch(setError('El campo incluye es obligatorio'));
      return false;
    }
    else if (noIncluye.length === 0 || noIncluye.every(e => e === '')) {
      dispatch(setError('El campo no incluye es obligatorio'));
      return false;
    }
    else if (photos.filter(Boolean).length < 5) {
      dispatch(setError('Debe subir las 5 fotos'));
      return false;
    }
    return true;
  }

  const handleFile = (e, index) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    dispatch(travelUploadTravelPicture(formData)).then(url => handleChangePhoto(url, index));
  }

  const handlePicture=(id)=>{
    document.querySelector(`#${id}`).click();
  }

  const handleSave = (e) => {
    e.preventDefault();

    if (travel) {
      if (isValid()) {
        dispatch(removeError());
        const include = incluye.filter(Boolean);
        const notInclude = noIncluye.filter(Boolean);
        dispatch(travelUpdateTravelAsync(id, disponible, precio, desde, hasta, lugar, descripcion, include, notInclude,photos));
        navigate('/admin/viajes');
      }
    } else {
      if (isValid()) {
        dispatch(removeError());
        const include = incluye.filter(Boolean);
        const notInclude = noIncluye.filter(Boolean);
        dispatch(travelCreateTravelAsync(disponible, precio, desde, hasta, lugar, descripcion, include, notInclude,photos));
        reset();
        setPhotos([]);
        setDisponible(false);
      }
    }
  }
  
  return (
    <>
      <section className="u-clearfix u-section-1v container" id="sec-6548">
        <form onSubmit={handleSave} className='admin-form'>
          <div className="u-clearfix u-sheet u-sheet-1v">
            <input
              type='file'
              name='principal'
              style={{ display: 'none' }}
              id='fileSelectorPrincipal'
              accept='image/*'
              onChange={(e) => handleFile(e, 0)}
            />
            <img onClick={()=>handlePicture('fileSelectorPrincipal')} className="animate__animated animate__flipInX u-expanded-width-md u-expanded-width-sm u-image u-image-default u-image-1v" src={photos[0]?photos[0]:'/assets/images/fotoviajes.png'} alt="" data-image-width="1280" data-image-height="854" />
            <div className="u-expanded-width-md u-expanded-width-sm u-gallery u-layout-grid u-lightbox u-show-text-on-hover u-gallery-1">
              <div className="u-gallery-inner u-gallery-inner-1">
                {
                  gallery.map((item, index) => (
                    <>
                    <input
                      key={index}
                      type='file'
                      name='secundario'
                      style={{display:'none'}}
                      id={`fileSelectorSecundario${index+1}`}
                      accept='image/*'
                      onChange={(e)=>handleFile(e,index+1)}
                    />
                    <TravelDetailPhotoAdmin
                      id={`fileSelectorSecundario${index+1}`}
                      handlePicture={handlePicture}
                      index={index+1}
                      photos={photos}
                    />
                    </>
                  ))
                }
              </div>
            </div>
            <div className='d-flex mt-3'>
              <div className='d-flex align-items-center'>
                <input
                  type='checkbox'
                  id='disponibilidad'
                  name='disponibilidad'
                  onChange={() => setDisponible(!disponible)}
                  checked={disponible}
                />
                <label className='ml-2 mb-0 ' htmlFor='disponibilidad'>Disponible</label>
              </div>
              <div className='ml-4'>
                <input
                  className="form-control admin-precio"
                  type='text'
                  name='precio'
                  placeholder='Precio'
                  onChange={handleInputChange}
                  value={precio}
                />
              </div>
            </div>
            <div>
              <div className='container-date mt-2'>
                <p>Fecha</p>
                <div className='d-flex date'>
                  <input
                    type="text"
                    onTouchStart={(e) => e.target.type = 'date'}
                    onFocus={(e) => e.target.type = 'date'}
                    onBlur={(e) => e.target.type = 'text'}
                    onChange={handleInputChange}
                    name="desde"
                    className="form-control"
                    placeholder={desde !== '' ? moment(desde).format('DD/MM/YYYY') : 'Desde'}
                    value={desde}
                  />
                  <input
                    type="text"
                    onTouchStart={(e) => e.target.type = 'date'}
                    onFocus={(e) => e.target.type = 'date'}
                    onBlur={(e) => e.target.type = 'text'}
                    onChange={handleInputChange}
                    name="hasta"
                    className="form-control ml-2"
                    placeholder={hasta !== '' ? hasta : 'Hasta'}
                    value={hasta}
                  />
                </div>
              </div>
            </div>
            <div className="u-list u-list-1v">
              <div className="u-repeater u-repeater-1v">
                <div className="u-container-style u-list-item u-repeater-item">
                  <div className="u-container-layout u-similar-container u-valign-top u-container-layout-1v admin-container-layout-1v">
                    <p><strong>¿Qué incluye?</strong></p>
                    {
                      incluye.map((include, index) => (
                        <input
                          key={index}
                          type="text"
                          name='incluye'
                          placeholder='Incluye'
                          className='form-control admin-incluye mb-2'
                          onChange={(e) => handleChangeIncluye(e, index)}
                          value={incluye[index]}
                        />
                      ))
                    }
                    <button
                      type='button'
                      className='btn btn-primary btn-i'
                      disabled={incluye.length === 4}
                      onClick={handleAddIncluye}
                    >Agregar</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="u-list u-list-2">
              <div className="u-repeater u-repeater-2v">
                <div className="u-container-style u-list-item u-repeater-item">
                  <div className="u-container-layout u-similar-container u-container-layout-5 admin-container-layout-5">
                    <p><strong>¿Qué no incluye?</strong></p>
                    {
                      noIncluye.map((notInclude, index) => (
                        <input
                          key={index}
                          type="text"
                          name='noIncluye'
                          placeholder='No incluye'
                          className='form-control admin-incluye mb-2'
                          onChange={(e) => handleChangeNoIncluye(e, index)}
                          value={noIncluye[index]}
                        />
                      ))
                    }
                    <button
                      type='button'
                      className='btn btn-primary btn-ni'
                      disabled={noIncluye.length === 4}
                      onClick={handleAddNoIncluye}
                    >Agregar</button>
                  </div>
                </div>
              </div>
            </div>
            <div className='u-text u-text-default u-text-1v1 admin-lugar'>
              <h4>Lugar</h4>
              <input
                type="text"
                name='lugar'
                placeholder='Lugar'
                className='form-control'
                onChange={handleInputChange}
                value={lugar}
              />
            </div>
            <div className='admin-lugar mt-5'>
              <h4>Descripción</h4>
              <textarea
                type="text"
                name='descripcion'
                style={{ resize: 'none' }}
                rows='8'
                placeholder='Descripcion'
                className='form-control'
                onChange={handleInputChange}
                value={descripcion}
              />
            </div>
            <div className='mt-4'>
              {
                msgError && <div className='alert-error'>
                  {msgError}
                </div>
              }
            </div>
            <button
              type='submit'
              className="u-border-none u-btn u-btn-round u-button-style u-custom-color-2 u-hover-palette-4-dark-1 u-radius-5 u-btn-1"
            >Guardar</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default CreateTravelScreen;