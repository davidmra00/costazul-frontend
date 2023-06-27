import React from 'react';
import { useSelector } from 'react-redux';
import slugify from 'react-slugify';
import OfferEntry from './OfferEntry';

const OfferSection = () => {
  const {offers}=useSelector(state=>state.offer);
  
  return offers.length!==0?
    (<section className="u-clearfix u-white u-section-3 container">
      <p className="u-align-center u-text u-text-custom-color-2 u-text-1">MEJORES OFERTAS </p>
      <h2 className="u-align-center u-custom-font u-font-montserrat u-text u-text-grey-75 u-text-2">Comienza a planear tus vacaciones</h2>
      <div className="top-destination-album u-expanded-width u-list u-list-1">
        <div className="u-repeater u-repeater-1 row">
          {
            offers.map(offer => (
                <OfferEntry
                  key={offer._id}
                  {...offer}
                  slug={slugify(offer.lugar)}
                />
              )
            )
          }
        </div>
      </div>
    </section>)
    :null
}

export default OfferSection;