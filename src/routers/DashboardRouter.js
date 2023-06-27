import React from 'react';
import {Routes,Route,Navigate} from 'react-router-dom';
import UserScreen from '../components/admin/UserScreen';
import RecargaSection from '../components/recargas/RecargaSection';
import RemesasSection from '../components/remesas/RemesasSection';
import TramitesSection from '../components/tramites/TramitesSection';
import HomeScreen from '../components/travel/HomeScreen';
import OfferDetail from '../components/travel/OfferDetail';
import TravelDetail from '../components/travel/TravelDetail';
import Footer from '../components/ui/Footer';
import Navbar from '../components/ui/Navbar';
import EmailVerificationMiddleware from '../middlewares/EmailVerificationMiddleware';
import AdminPrivateRouter from './AdminPrivateRouter';
import AdminRouter from './AdminRouter';
import PrivateRouter from './PrivateRouter';

const DashboardRouter = () => {
  return (
    <>        
        <Navbar />            
        <Routes>
          <Route
            path='/viajes'
            element={<HomeScreen />}
          />
          <Route
            path='/viajes/:slug'
            element={<TravelDetail />}
          />
          <Route
            path='/ofertas/:slug'
            element={<OfferDetail />}
          />
          <Route
            path='/recargas'
            element={<RecargaSection />}
          />
          <Route
            path='/remesas'
            element={<RemesasSection />}
          />
          <Route
            path='/tramites'
            element={<TramitesSection />}
          />
          <Route
            path='/cuenta'
            element={
              <PrivateRouter>
                <UserScreen />
              </PrivateRouter>
            }
          />
          <Route
            path='/cuenta/email/:token'
            element={<EmailVerificationMiddleware />}
          />
          <Route
            path='/admin/*'
            element={
              <AdminPrivateRouter>
                <AdminRouter />
              </AdminPrivateRouter>
            }
          />
          <Route
            path='/*'
            element={<Navigate to='/viajes' />}
          />
        </Routes>
        <Footer />
    </>
  )
}

export default DashboardRouter;