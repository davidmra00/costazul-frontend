import React from 'react';
import { useSelector } from 'react-redux';
import '../../styles/TravelSection.css';
import TravelEntry from './TravelEntry';
import slugify from 'react-slugify';

const TravelSection = () => {
  const { travels } = useSelector(state => state.travel);

  return travels.length!==0 ?
    (<section className="u-clearfix u-white u-section-3 container mt-5">
      <p className="u-align-center u-text u-text-custom-color-2 u-text-1">DESTINOS</p>
      <div className="u-expanded-width-md u-expanded-width-sm u-expanded-width-xs u-list u-list-2">
        <div className="u-repeater u-repeater-2">
          {
            travels.map(travel => (
              <TravelEntry
                key={travel._id}
                {...travel}
                slug={slugify(travel.lugar)}
              />
            )
            )
          }
        </div>
      </div>
    </section>)
    : null
}

export default TravelSection;