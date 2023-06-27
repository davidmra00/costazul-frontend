import React from 'react';

const TravelDetailPhoto = ({photos,index,handleClickImage}) => {
  return (
    <div className="u-effect-fade u-effect-hover-zoom u-gallery-item u-gallery-item-1">
      <div className="u-back-slide" data-image-width="1280" data-image-height="903">
        <img onClick={handleClickImage} className="u-back-image u-expanded" alt="" src={photos[index]} />
      </div>
    </div>
  )
}

export default TravelDetailPhoto;