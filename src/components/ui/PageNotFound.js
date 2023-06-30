import React from 'react';
import '../../styles/page-not-found.css';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className='not-found-container'>
      <h1>Error 404</h1>
      <p className="zoom-area">Esta página no existe</p>
      <section className="error-container">
        <span><span>4</span></span>
        <span>0</span>
        <span><span>4</span></span>
      </section>
      <div className="link-container">
        <Link to='/' className="more-link">Volver al inicio</Link>
      </div>
    </div>
  )
}

export default PageNotFound;