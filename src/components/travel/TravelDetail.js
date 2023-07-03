import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import slugify from 'react-slugify';
import moment from 'moment';
import 'moment/locale/es';
import { travelLoadTravelsAsync } from '../../actions/travelActions';
import { uiOpenModal } from '../../actions/uiActions';
import '../../styles/Viaje.css';
import TravelDetailInclude from './TravelDetailInclude';
import TravelDetailNotInclude from './TravelDetailNotInclude';
import TravelDetailPhoto from './TravelDetailPhoto';
import TravelEntry from './TravelEntry';
import TravelModal from './TravelModal';
import Loader from '../ui/Loader';
import PageNotFound from '../ui/PageNotFound';

const TravelDetail = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(travelLoadTravelsAsync());
  }, [dispatch]);

  const { slug } = useParams();
  const lugar = slug.replace(/-/g, ' ');

  const { travels, checking } = useSelector(state => state.travel);
  const travel = travels.find(travel => travel.lugar.toLowerCase() === lugar);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [travel]);

  const { nombre, verificado } = useSelector(state => state.auth);

  if (!travel && checking === true)
    return <Loader />;

  if (!travel && checking === false)
    return <PageNotFound />;

  const inicio = moment(travel.fechaInicio).add(1, 'days').locale('es').format('D [de] MMMM [de] YYYY');
  const fin = moment(travel.fechaFin).add(1, 'days').locale('es').format('D [de] MMMM [de] YYYY');

  const otherTravels = [...travels];
  otherTravels.sort(() => Math.random() - 0.5);
  const otherTravels2 = otherTravels.slice(0, 3);

  const gallery = [1, 2, 3, 4];

  const openModal = () => {
    if (!nombre) {
      navigate('/login');
    } else {
      dispatch(uiOpenModal());
    }
  }

  const handleClickImage = (e) => {
    e.target.requestFullscreen();
  }

  return (
    <>
      <section className="u-clearfix u-section-1v container" id="sec-6548">
        <div className="u-clearfix u-sheet u-sheet-1v">
          <img onClick={handleClickImage} className="animate__animated animate__flipInX u-expanded-width-md u-expanded-width-sm u-image u-image-default u-image-1v" src={travel.fotoUrl[0]} alt="" data-image-width="1280" data-image-height="854" />
          <div className="u-expanded-width-md u-expanded-width-sm u-gallery u-layout-grid u-lightbox u-show-text-on-hover u-gallery-1">
            <div className="u-gallery-inner u-gallery-inner-1">
              {
                gallery.map((item, index) => (
                  <TravelDetailPhoto
                    key={index}
                    index={index + 1}
                    photos={travel.fotoUrl}
                    handleClickImage={handleClickImage}
                  />
                ))
              }
            </div>
          </div>
          <p className="u-text u-text-default u-text-1v">Precio: ${travel.precio}</p>
          {
            travel.disponibilidad
              ? <p className="u-text u-text-2v">DISPONIBLE</p>
              : <p className="u-text u-text-2nv">NO DISPONIBLE</p>
          }
          <div className='container-date'>
            <div className='d-flex date'>
              <p className='mr-2'><strong>Desde:</strong> {inicio}</p>
              <p className='ml-2'><strong>Hasta:</strong> {fin}</p>
            </div>
          </div>
          <div className='incluyes-container'>
            <div className="u-container-layout u-similar-container u-valign-top u-container-layout-1v">
              <p><strong>¿Qué incluye?</strong></p>
              {
                travel.incluye.map(include => (
                  <TravelDetailInclude
                    key={Math.random() * 1000}
                    include={include}
                  />
                ))
              }
            </div>
            <div className="u-container-layout u-similar-container u-container-layout-5">
              <p><strong>¿Qué no incluye?</strong></p>
              {
                travel.noIncluye.map(notInclude => (
                  <TravelDetailNotInclude
                    key={Math.random() * 1000}
                    notInclude={notInclude}
                  />
                ))
              }
            </div>
          </div>
          <div className="u-list u-list-1v">
            <div className="u-repeater u-repeater-1v">
              <div className="u-container-style u-list-item u-repeater-item">
                <div className="u-container-layout u-similar-container u-valign-top u-container-layout-1v layout-1v">
                  <p><strong>¿Qué incluye?</strong></p>
                  {
                    travel.incluye.map(include => (
                      <TravelDetailInclude
                        key={Math.random() * 1000}
                        include={include}
                      />
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="u-list u-list-2">
            <div className="u-repeater u-repeater-2v">
              <div className="u-container-style u-list-item u-repeater-item">
                <div className="u-container-layout u-similar-container u-container-layout-5 layout-5">
                  <p><strong>¿Qué no incluye?</strong></p>
                  {
                    travel.noIncluye.map(notInclude => (
                      <TravelDetailNotInclude
                        key={Math.random() * 1000}
                        notInclude={notInclude}
                      />
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
          <h2 className="u-text u-text-default u-text-1v1">{travel.lugar}</h2>
          <p className="u-text u-text-1v2">{travel.descripcion}</p>
          <p
            className="u-border-none u-btn u-btn-round u-button-style u-custom-color-2 u-hover-palette-4-dark-1 u-radius-5 u-btn-1"
            onClick={openModal}
          >COTIZAR</p>
        </div>
        <TravelModal
          {...travel}
          nombre={nombre}
          verificado={verificado}
        />
      </section>
      <section className="u-clearfix u-white u-section-3 container u-section-3-viajes">
        <p>OTROS DESTINOS</p>
        <div className="u-expanded-width-md u-expanded-width-sm u-expanded-width-xs u-list u-list-2">
          <div className="u-repeater u-repeater-2">
            {
              otherTravels2.map(travel => (
                <TravelEntry
                  key={travel._id}
                  {...travel}
                  slug={slugify(travel.lugar)}
                />
              )
              )
            }
          </div>
        </div>
      </section>
    </>
  )
}

export default TravelDetail;