import React from 'react';
import { Dropdown } from 'react-bootstrap';
import {Link} from 'react-router-dom';

const LoginDropdown = () => {

  return (
    <Dropdown
      className='login-dropdown'
    >
      <Dropdown.Toggle
        variant='demo'
        id='dropdown-basic'
      >
        <div className='profile-min'>
          <img src='assets/icons/fotousuario.png' alt='' width='100%' height='100%' style={{borderRadius:'100%'}}/>
        </div>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Link to='/login' style={{textDecoration:'none'}}>
          <Dropdown.Item
            href='login'
            className='btn btn-custom'
          >Iniciar Sesión</Dropdown.Item>       
        </Link>
        <Link to='/register' style={{textDecoration:'none'}}>
          <Dropdown.Item
            href='register'
            className='btn'
          >Registarse</Dropdown.Item>   
        </Link>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default LoginDropdown;