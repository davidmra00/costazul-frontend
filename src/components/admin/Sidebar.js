import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <nav className='sidebar'>
      <div className='n-container'>
        <NavLink
          to='/admin/viajes'
          className={({ isActive }) => isActive ? 'link-sidebar active-link-sidebar' : 'link-sidebar'}
        >
          Viajes
        </NavLink>
        <NavLink
          to='/admin/ofertas'
          className={({ isActive }) => isActive ? 'link-sidebar active-link-sidebar' : 'link-sidebar'}
        >
          Ofertas
        </NavLink>
        <NavLink
          to='/admin/recargas'
          className={({ isActive }) => isActive ? 'link-sidebar active-link-sidebar' : 'link-sidebar'}
        >
          Recargas
        </NavLink>
        <NavLink
          to='/admin/remesas'
          className={({ isActive }) => isActive ? 'link-sidebar active-link-sidebar' : 'link-sidebar'}
        >
          Remesas
        </NavLink>
        <NavLink
          to='/admin/tramites'
          className={({ isActive }) => isActive ? 'link-sidebar last-link active-link-sidebar' : 'link-sidebar last-link'}
        >
          Trámites Migratorios
        </NavLink>
        <NavLink
          to='/admin/usuarios'
          className={({ isActive }) => isActive ? 'link-sidebar last-link active-link-sidebar' : 'link-sidebar last-link'}
        >
          Usuarios
        </NavLink>
        </div>
    </nav>
  )
}

export default Sidebar;