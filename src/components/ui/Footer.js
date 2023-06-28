import React from 'react';
import {Link} from 'react-router-dom';
import MapFooter from './MapFooter';

const Footer = () => {
  return (
    <footer className="u-clearfix u-footer u-grey-80" id="sec-b216">
      <div className="u-clearfix u-sheet u-sheet-1 cont-footer">
        <div className="u-clearfix u-expanded-width u-gutter-30 u-layout-wrap u-layout-wrap-1">
          <div className="u-gutter-0 u-layout">
            <div className=" row">
              <div className="col d-flex pb-0">
                <div className="u-container-layout u-valign-middle u-container-layout-1">
                  <div data-position="" className="u-position">
                    <div className="u-block">
                      <div className="u-block-container u-clearfix d-flex flex-column contactos">
                        <h3 className="u-block-header u-text text-center mb-3">Contactos</h3>
                          <div className='tel-container mt-2'>
                            <img src='assets/icons/telefono1.png' alt='' className='img-icon-footer' />
                            <p className='align-self-center m-0 ml-2'>+1 (561) 247 8996</p>
                          </div>
                          <div className='tel-container mt-2'>
                            <img src='assets/icons/whatsapp.png' alt='' className='img-icon-footer' />
                            <Link to='https://wa.me/15617859797' className='align-self-center m-0 ml-2' style={{color:"white"}} target='_blank'>+1 (561) 785 9797</Link>
                          </div>
                          <div className='tel-container mt-2'>
                            <img src='assets/icons/correo.png' alt='' className='img-icon-footer' />
                            <p className='align-self-center m-0 ml-2'>costazultravel2@gmail.com</p>
                          </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col d-flex justify-content-center">
                <div className="u-container-layout u-valign-middle u-container-layout-2 d-flex justify-content-start">
                  <h3 className='align-self-center mb-5 mt-1'>Redes Sociales</h3>
                  <div className='d-flex justify-content-evenly'>
                    <Link to="https://www.facebook.com/costazultravel2" target='_blank'>
                      <img src="assets/icons/facebook.png" alt="" className="redes-sociales" />
                    </Link>
                    <Link to="https://instagram.com/costazul_travel?igshid=NTc4MTIwNjQ2YQ==" target='_blank'>
                      <img src="assets/icons/instagram.jpg" alt="" className="redes-sociales" />
                    </Link>
                    <Link to="" target='_blank'>
                      <img src="assets/icons/tiktok.png" alt="" className="redes-sociales" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className='map-container col'>
                <MapFooter />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;