import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { uiCloseModalMenu } from '../../actions/uiActions';
import '../../styles/menu-modal.css';

const MenuModal = () => {
  const dispatch = useDispatch();

  const { modalOpenMenu } = useSelector(state => state.ui);

  const closeModalMenu = () => {
    const modal=document.querySelector('.modal');
    modal.classList.add('animate__fadeOutLeft');
    modal.addEventListener('animationend', () => {
      dispatch(uiCloseModalMenu());
    });
  }

  return (
    <>
      <Modal
        show={modalOpenMenu}
        onHide={closeModalMenu}
        animation={false}
        className='animate__animated animate__fadeInLeft animate__faster'
      >
        <Modal.Header>
          <div>
            <img src='/assets/images/WhatsAppImage2023-04-29at10.11.19AM.jpeg' className='img-fluid' alt="" width="60%" height="70%" />
          </div>
          <div className="u-menu-close" onClick={closeModalMenu}></div>
        </Modal.Header>
        <Modal.Body>
          <div className='text-center'>
              <NavLink 
                to='/viajes' 
                className={({isActive})=>isActive?'btn-block nav-link mb-3 active-link':'btn-block nav-link mb-3'}
                onClick={closeModalMenu}
              >
                Viajes
              </NavLink>
              <NavLink 
                to='/recargas' 
                className={({isActive})=>isActive?'btn-block nav-link mb-3 active-link':'btn-block nav-link mb-3'}
                onClick={closeModalMenu}
              >
                Recargas
              </NavLink>
              <NavLink 
                to='/remesas' 
                className={({isActive})=>isActive?'btn-block nav-link mb-3 active-link':'btn-block nav-link mb-3'}
                onClick={closeModalMenu}
              >
                Remesas
              </NavLink>
              <NavLink 
                to='/tramites' 
                className={({isActive})=>isActive?'btn-block nav-link mb-3 active-link':'btn-block nav-link mb-3'}
                onClick={closeModalMenu}
              >
                Trámites migratorios
              </NavLink>
           
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default MenuModal;