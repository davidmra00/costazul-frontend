import React from 'react';
import { Dropdown } from 'react-bootstrap';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { authCheckingFinish, authLogoutLogic } from '../../actions/authActions';

const UserMenu = ({nombre,admin,fotoUrl}) => {
  const dispatch=useDispatch();

  const navigate=useNavigate();
  
  const words=nombre.split(' ');
  const name=words[0];

  const handleLogout=()=>{
    dispatch(authLogoutLogic());
    dispatch(authCheckingFinish());
    navigate('/');
  }

  return (
    <Dropdown>
      <Dropdown.Toggle
        variant='demo'
        id='dropdown-basic'
      >
        <div className='profile-min'>
          <img src={fotoUrl?fotoUrl:'/assets/icons/fotousuario.png'} alt='' width='100%' height='100%' style={{borderRadius:'100%'}}/>
        </div>
        {name}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item
          href='/cuenta'
          className='dropdown-item-user'
        >Gestionar cuenta</Dropdown.Item>
        {
          admin &&
          <Dropdown.Item
            href='/admin/viajes'
            className='dropdown-item-user'
          >Administrar</Dropdown.Item>
        }
        <Dropdown.Item
          className='btn-logout'
          onClick={handleLogout}
        >Cerrar Sesión</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default UserMenu;