import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import '../../styles/admin.css';
import useForm from '../../hooks/useForm';
import { userDeletebyAdminAsync, userGetUsersAsync } from '../../actions/userActions';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const AdminUserScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    dispatch(userGetUsersAsync()).then((users) => setUsers(users));
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [value, handleInputChange] = useForm({ buscar: '' });
  const { buscar } = value;

  if (!users)
    return navigate('/');

  const usuarios = users.filter(user => user.nombre.toLowerCase().includes(buscar.toLowerCase()));

  const handleDelete = (id) => {
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
        dispatch(userDeletebyAdminAsync(id));
        setUsers(users.filter(user => user._id !== id));
      }
    });
  }

  return (
    <div className='animate__animated animate__bounce table-container table-responsive p-5' >
      <div className='pb-3 d-flex  justify-content-between'>
        <input
          type='text'
          name='buscar'
          placeholder='Buscar usuario'
          className='form-control buscar'
          onChange={handleInputChange}
          value={buscar}
        />
        <Link
          to='/admin/usuarios/crear'
          className='btn btn-primary'
        >Crear</Link>
      </div>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th className='text-center'>Nombre</th>
            <th className='text-center'>Admin</th>
            <th className='text-center'>Verificado</th>
          </tr>
        </thead>
        <tbody>
          {
            usuarios.map(user => (
              <tr key={user._id}>
                <td className='align-middle text-center'>{user.nombre}</td>
                <td className='align-middle text-center'>
                  {
                    user.admin ? 'Si' : 'No'
                  }
                </td>
                <td className='align-middle text-center'>
                  {
                    user.verificado ? 'Si' : 'No'
                  }
                </td>
                <td><Link to={`/admin/usuarios/${user._id}`} className='btn btn-info'>Editar</Link></td>
                <td><button className='btn btn-danger' onClick={() => handleDelete(user._id)}>Eliminar</button></td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default AdminUserScreen;