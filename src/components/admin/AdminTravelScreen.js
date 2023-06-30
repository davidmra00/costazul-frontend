import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { travelDeleteTravelsAsync, travelLoadTravelsAsync } from '../../actions/travelActions';
import '../../styles/admin.css';
import useForm from '../../hooks/useForm';
import { Link } from 'react-router-dom';

const AdminTravelScreen = () => {
  const dispatch = useDispatch();
  
  const { travels } = useSelector(state => state.travel);

  useEffect(() => {
    dispatch(travelLoadTravelsAsync());
  }, [dispatch,travels]);

  const [value,handleInputChange]=useForm({buscar:''});
  const {buscar}=value;

  const viajes=travels.filter(travel=>travel.lugar.toLowerCase().includes(buscar.toLowerCase()));

  const handleDelete=(id)=>{
    dispatch(travelDeleteTravelsAsync(id));
  }

  return (
    <div className='animate__animated animate__bounce table-container table-responsive p-5'>
      <div className='pb-3 d-flex  justify-content-between'>
        <input
          type='text'
          name='buscar'
          placeholder='Buscar viaje'
          className='form-control buscar'
          onChange={handleInputChange}
          value={buscar}
        />
        <Link
          to='/admin/viajes/crear'
          className='btn btn-primary'
        >Crear</Link>
      </div>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th className='text-center'>Lugar</th>
            <th className='text-center'>Precio</th>
            <th className='text-center'>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {
            viajes.map(viaje => (
              <tr key={viaje._id}>
                <td className='align-middle text-center'>{viaje.lugar}</td>
                <td className='align-middle text-center'>{viaje.precio}</td>
                <td className='align-middle text-center'>{moment(viaje.fechaInicio).add(1,'days').locale('es').format('D [de] MMMM [de] YYYY')}-{moment(viaje.fechaFin).add(1,'days').locale('es').format('D [de] MMMM [de] YYYY')}</td>
                <td><Link to={`/admin/viajes/${viaje._id}`}><p className='btn btn-info'>Editar</p></Link></td>
                <td><p className='btn btn-danger' onClick={()=>handleDelete(viaje._id)}>Eliminar</p></td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default AdminTravelScreen;