import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import MenuModal from './MenuModal';
import { uiOpenModalMenu } from '../../actions/uiActions';
import UserMenu from './UserMenu';
import LoginDropdown from './LoginDropdown';

const Navbar = () => {
  const dispatch = useDispatch();

  const {uid}=useSelector(state=>state.auth);
  const {nombre}=useSelector(state=>state.auth);
  const {admin}=useSelector(state=>state.auth);
  const {checking}=useSelector(state=>state.auth);
  const {fotoUrl}=useSelector(state=>state.auth);

  const handleOpenModalMenu = () => {
    dispatch(uiOpenModalMenu());
  }

  return (
    <>
      <nav className="fixed-top u-align-center-sm u-align-center-xs u-border-1 u-border-grey-15 u-border-no-left u-border-no-right u-border-no-top u-clearfix u-header u-white u-header" id="sec-cada">
        <div className="u-clearfix u-sheet u-sheet-1 container-footer d-flex">
          <div className='mr-5 open-menu' onClick={handleOpenModalMenu}>
            <img src='/assets/icons/align-justify-svgrepo-com.svg' alt='' width='30' height='30' />
          </div>
          <Link to="/travel" className="u-image u-logo u-image-1 logo-navbar" data-image-width="1024" data-image-height="429">
            <img src="/assets/images/WhatsAppImage2023-04-29at10.11.19AM.jpeg" alt="" className="u-logo-image u-logo-image-1  nav-logo" />
          </Link>
        </div>
        { 
          checking?null:
          (!!uid
            ?(<div className='user-menu'>
                <UserMenu nombre={nombre} admin={admin} fotoUrl={fotoUrl}/>
              </div>)
            :(<>
                <div className='nav-login'>
                  <Link to="/register" className="btn">Registrarse</Link>
                  <Link to="/login" className="btn btn-custom">Iniciar Sesión</Link>
                </div>
                <LoginDropdown />
              </>))
        }
      </nav>
      <MenuModal />
    </>
  )
}

export default Navbar;