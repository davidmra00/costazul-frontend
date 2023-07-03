import React from 'react';

const TravelDetailPhotoAdmin = ({id,handlePicture,index,photos}) => {
  return (
    <div className="u-effect-fade u-effect-hover-zoom u-gallery-item u-gallery-item-1">
      <div className="u-back-slide" data-image-width="1280" data-image-height="903">
        <img onClick={()=>handlePicture(id)} className="u-back-image u-expanded" alt="" src={photos[index]?photos[index]:'/costazul-frontend/assets/images/fotoviajes.png'} />
      </div>
    </div>
  )
}

export default TravelDetailPhotoAdmin;