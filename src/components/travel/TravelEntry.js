import React from 'react';

const TravelEntry = ({slug,lugar,descripcion,fotoUrl}) => {
  
  return (
    <>
      <div className="u-container-style u-list-item u-repeater-item u-list-item-5 col">
        <div className="u-container-layout u-similar-container u-container-layout-9">
          <img className="u-expanded-width u-image u-image-default u-image-5" src={fotoUrl[0]} alt="" data-image-width="1280" data-image-height="848" />
          <h3 className="u-custom-font u-font-montserrat u-text u-text-black u-text-default u-text-8">{lugar}</h3>
          <p className="u-custom-font u-text u-text-9">{descripcion.slice(0,100)+'...'}</p>
          <a href={`viajes/${slug}`} className="u-border-none u-btn u-btn-round u-button-style u-custom-color-2 u-hover-palette-4-dark-1 u-radius-6 u-btn-1">SABER MÁS</a>
        </div>
      </div>
      
    </>
  )
}

export default TravelEntry;