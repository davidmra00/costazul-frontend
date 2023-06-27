import React from 'react';

const OfferEntry = ({slug,lugar,fotoUrl}) => {
  return (
    <div className="u-container-style u-list-item u-repeater-item col">
      <div className="u-container-layout u-similar-container u-container-layout-1">
        <a href={`/ofertas/${slug}`} style={{textDecoration:"none"}}>
          <img className="u-expanded-width-lg u-expanded-width-xl u-image u-image-default u-image-1" src={fotoUrl[0]} alt="" data-image-width="1280" data-image-height="881" />
          <div className="u-container-style u-grey-75 u-group u-opacity u-opacity-60 u-radius-5 u-shape-round u-group-1">
            <div className="u-container-layout u-valign-middle-lg u-valign-middle-md u-valign-middle-xl u-container-layout-2">
              <p className="u-align-center u-custom-font u-text u-text-body-alt-color u-text-3">{lugar}</p>
            </div>
          </div>
        </a>
      </div>
    </div>
  )
}

export default OfferEntry;