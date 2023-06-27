import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminOfferScreen from '../components/admin/AdminOfferScreen';
import AdminTravelScreen from '../components/admin/AdminTravelScreen';
import AdminUserScreen from '../components/admin/AdminUserScreen';
import CreateOfferScreen from '../components/admin/CreateOfferScreen';
import CreateTravelScreen from '../components/admin/CreateTravelScreen';
import CreateUserScreen from '../components/admin/CreateUserScreen';
import Sidebar from '../components/admin/Sidebar';

const AdminRouter = () => {
  return (
    <>
      <div className='admin-container'>
        <Sidebar />
        <Routes>
          <Route
            path='/viajes'
            element={<AdminTravelScreen />}
          />
          <Route
            path='/viajes/:id'
            element={<CreateTravelScreen />}
          />
          <Route
            path='/viajes/crear'
            element={<CreateTravelScreen />}
          />
          <Route
            path='/ofertas'
            element={<AdminOfferScreen />}
          />
          <Route
            path='/ofertas/:id'
            element={<CreateOfferScreen />}
          />
          <Route
            path='/ofertas/crear'
            element={<CreateOfferScreen />}
          />
          <Route
            path='/usuarios'
            element={<AdminUserScreen />}
          />
          <Route
            path='/usuarios/:id'
            element={<CreateUserScreen />}
          />
          <Route
            path='/usuarios/crear'
            element={<CreateUserScreen />}
          />
        </Routes >
      </div>
    </>
  )
}

export default AdminRouter;