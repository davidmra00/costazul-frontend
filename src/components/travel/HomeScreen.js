import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AboutSection from './AboutSection';
import OfferSection from './OfferSection';
import TravelSection from './TravelSection';
import WelcomeSection from './WelcomeSection';
import {travelLoadTravelsAsync} from '../../actions/travelActions';
import { offerLoadOffersAsync } from '../../actions/offerActions';
import '../../styles/Home.css';
import ServicesSection from './ServicesSection';

const HomeScreen = () => {
  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(travelLoadTravelsAsync());
  },[dispatch]);

  useEffect(()=>{
    dispatch(offerLoadOffersAsync());
  },[dispatch]);

  return (
    <>
      <WelcomeSection />
      <OfferSection />
      <TravelSection />
      <AboutSection />
      <ServicesSection />
    </>
  )
}

export default HomeScreen;