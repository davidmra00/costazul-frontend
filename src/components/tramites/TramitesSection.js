import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const TramitesSection = () => {
  useEffect(()=>{
    window.scrollTo(0,0);
  },[]);

  return (
    <section className="animate__animated animate__slideInDown u-align-left u-clearfix u-image u-shading u-section-6" src="" data-image-width="1920" data-image-height="1282">
      <div className="u-clearfix u-sheet u-sheet-1">
      <div className='text-container'>
        <h1 className="u-text u-text-default u-title u-text-1">Trámites migratorios</h1>
        <p className="u-large-text u-text u-text-variant u-text-2">Nuestro servicio de trámites migratorios es fácil de usar y asequible. Simplemente comunícate con nosotros y uno de nuestros expertos se pondrá en contacto contigo para ayudarte con el proceso. Te guiaremos a través de cada paso del proceso, asegurándonos de que cumplas con todos los requisitos necesarios y que tu solicitud sea procesada de manera efectiva.</p>
        <Link to="/" className="u-border-none u-btn u-btn-round u-button-style u-custom-color-2 u-radius-5 u-btn-1">CONTACTAR</Link>
      </div>
      </div>
    </section>
  )
}

export default TramitesSection;