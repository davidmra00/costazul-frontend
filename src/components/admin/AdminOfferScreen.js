import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import '../../styles/admin.css';
import useForm from '../../hooks/useForm';
import { offerDeleteOffersAsync, offerLoadOffersAsync } from '../../actions/offerActions';

const AdminOfferScreen = () => {
  const dispatch = useDispatch();
  
  const { offers } = useSelector(state => state.offer);

  useEffect(() => {
    dispatch(offerLoadOffersAsync());
  }, [dispatch,offers]);

  const [value,handleInputChange]=useForm({buscar:''});
  const {buscar}=value;

  const ofertas=offers.filter(offer=>offer.lugar.toLowerCase().includes(buscar.toLowerCase()));

  const handleDelete=(id)=>{
    dispatch(offerDeleteOffersAsync(id));
  }

  return (
    <div className='animate__animated animate__bounce table-container table-responsive p-5'>
      <div className='pb-3 d-flex  justify-content-between'>
        <input
          type='text'
          name='buscar'
          placeholder='Buscar oferta'
          className='form-control buscar'
          onChange={handleInputChange}
          value={buscar}
        />
        <a
          href='/admin/ofertas/crear'
          className='btn btn-primary'
        >Crear</a>
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
            ofertas.map(oferta => (
              <tr key={oferta._id}>
                <td className='align-middle text-center'>{oferta.lugar}</td>
                <td className='align-middle text-center'>{oferta.precio}</td>
                <td className='align-middle text-center'>{moment(oferta.fechaInicio).add(1,'days').locale('es').format('D [de] MMMM [de] YYYY')}-{moment(oferta.fechaFin).add(1,'days').locale('es').format('D [de] MMMM [de] YYYY')}</td>
                <td><a href={`/admin/ofertas/${oferta._id}`}><p className='btn btn-info'>Editar</p></a></td>
                <td><p className='btn btn-danger' onClick={()=>handleDelete(oferta._id)}>Eliminar</p></td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default AdminOfferScreen;