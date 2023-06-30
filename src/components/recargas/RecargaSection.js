import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const RecargaSection = () => {
  useEffect(()=>{
    window.scrollTo(0,0);
  },[]);

  return (
    <section className="animate__animated animate__slideInDown u-clearfix u-section-4" id="recarga-section-id">
      <p className="u-align-center u-text u-text-custom-color-2 u-text-1">RECARGAS</p>
      <h2 className="u-align-center u-custom-font u-font-montserrat u-text u-text-grey-75 u-text-2">Mantente comunicado con tu familia en Cuba</h2>
      <div className="u-custom-color-4 u-expanded-width u-shape u-shape-rectangle u-shape-1"></div>
        <img className="u-image u-image-round u-radius-5 u-image-1" src="assets/images/pexels-cottonbro-studio-4046303.jpg" alt="" data-image-width="1920" data-image-height="2880" />
      <div className="u-container-style u-group u-palette-5-dark-2 u-radius-5 u-shape-round u-group-1">
        <div className="u-container-layout u-valign-bottom-lg u-valign-bottom-md u-valign-bottom-sm u-valign-bottom-xl u-container-layout-1">
          <p className="u-text u-text-default u-text-1">En Costazul Travel, nos enorgullece ofrecer un servicio de recargas de teléfonos móviles a Cuba que es fácil, rápido y seguro. Con nuestra agencia, puedes recargar el teléfono de tus amigos y familiares en Cuba en pocos minutos, sin importar dónde te encuentres.</p>
          <Link to="/" className="u-border-none u-btn u-btn-round u-button-style u-hover-white u-radius-6 u-text-black u-white u-btn-1">Contactar</Link>
        </div>
      </div>
    </section>
  )
}

export default RecargaSection;