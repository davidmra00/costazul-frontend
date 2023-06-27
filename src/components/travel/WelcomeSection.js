import React,{useState} from 'react';
import slugify from 'react-slugify';
import moment from 'moment';
import { useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import useForm from '../../hooks/useForm';

const WelcomeSection = () => {
  const navigate=useNavigate();

  const [isSearch,setIsSearch]=useState(false);

  const { travels } = useSelector(state => state.travel);
  const { offers } = useSelector(state => state.offer);

  const allTravels = travels.concat(offers);

  const [values, handleInputChange] = useForm({
    destino: '',
    checkIn: '',
    checkOut: ''
  });
  const { destino, checkIn, checkOut } = values;

  const result = allTravels.filter(travel => (travel.lugar.toLowerCase().includes(destino.toLowerCase()) && travel.fechaInicio.slice(0,10).includes(checkIn) && travel.fechaFin.slice(0,10).includes(checkOut)));

  const handleSearch=()=>{
    setIsSearch(!isSearch);
  }
  
  const handleClick=(lugar)=>{
    navigate(`/viajes/${slugify(lugar)}`)
  }

  return (
    <>
      <section className="animate__animated animate__slideInDown u-clearfix u-section-1" id="sec-cec0">
        <img className="u-expanded-width u-image u-image-1" alt="" src="/assets/images/1188c906f53cd7beac0e769db2dcd940f602ce7da0e5eb2b6bbb616ad3c133325607746c872bfdfd8d4d2afa9fbc10e14f33ffb7fe571cae6df01d_1280.jpg" data-image-width="1280" data-image-height="853" />
        <div className="u-border-2 u-border-grey-15 u-container-style u-group u-radius-5 u-shape-round u-white u-group-1">
          <div className="u-container-layout u-container-layout-1">
            <div className="u-absolute-hcenter u-expanded u-form">
              <form action="" className="u-clearfix u-form-horizontal u-form-spacing-12 u-inner-form" style={{ padding: "13px" }}>
                <div className="u-form-group u-form-name u-label-top">
                  <label htmlFor="destino">Destino</label>
                  <input type="text" id="destino" name="destino" className="form-control" placeholder="Destino" onChange={handleInputChange} />
                </div>
                <div className="u-form-date u-form-group u-label-top u-form-group-2">
                  <label htmlFor="checkIn">Check-in</label>
                  <input type="text" onTouchStart={(e) => e.target.type = 'date'} onFocus={(e) => e.target.type = 'date'} id="checkIn" name="checkIn" className="form-control" placeholder='Check-in' onChange={handleInputChange} />
                </div>
                <div className="u-form-date u-form-group u-label-top u-form-group-3">
                  <label htmlFor="checkOut">Check-out</label>
                  <input type="text" onTouchStart={(e) => e.target.type = 'date'} onFocus={(e) => e.target.type = 'date'} id="checkOut" name="checkOut" className="form-control" placeholder='Check-out' onChange={handleInputChange} />
                </div>
                <button
                  type='button'
                  className='btn btn-custom btn-buscar'
                  onClick={handleSearch}
                >{isSearch?'Cancelar':'Buscar'}</button>
              </form>
            </div>
          </div>
        </div>
        <h1 className="u-custom-font u-font-montserrat u-text u-text-body-alt-color u-text-default u-text-1">COSTAZUL</h1>
        <p className="u-align-center u-custom-font u-font-montserrat u-text u-text-body-alt-color u-text-2">Las Mejores Vacaciones Con Nosotros </p>
      </section>
      <section>
        {
          isSearch &&
          <div className='animate__animated animate__fadeIn table-container-search table-responsive p-5'>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th className='text-center'>Lugar</th>
                  <th className='text-center'>CheckIn</th>
                  <th className='text-center'>CheckOut</th>
                </tr>
              </thead>
              <tbody>
                {
                  (destino || checkIn || checkOut) &&
                  result.map(viaje => (
                    <tr key={viaje._id} className='tr-search' onClick={()=>handleClick(viaje.lugar)}>
                      <td className='align-middle text-center'>{viaje.lugar}</td>
                      <td className='align-middle text-center'>{moment(viaje.fechaInicio).add(1, 'days').locale('es').format('D [de] MMMM [de] YYYY')}</td>
                      <td className='align-middle text-center'>{moment(viaje.fechaFin).add(1, 'days').locale('es').format('D [de] MMMM [de] YYYY')}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        }
      </section>
    </>
  )
}

export default WelcomeSection;