import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {useDispatch} from 'react-redux';
import { authRenewalAsync } from "../actions/authActions";
import ForgetPasswordScreen from "../components/auth/ForgetPassworScreen";
import LoginScreen from "../components/auth/LoginScreen";
import RegisterScreen from "../components/auth/RegisterScreen";
import PasswordResetMiddleware from "../middlewares/PasswordResetMiddleware";
import DashboardRouter from "./DashboardRouter";
import PublicRouter from './PublicRouter';

const AppRouter = () => {
  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(authRenewalAsync());
  },[dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/login'
          element={
            <PublicRouter>
              <LoginScreen />
            </PublicRouter>
          }
        />
        <Route
          path='/register'
          element={
            <PublicRouter>
              <RegisterScreen />
            </PublicRouter>
          }
        />
        <Route
          path='/forget'
          element={
            <PublicRouter>
              <ForgetPasswordScreen />
            </PublicRouter>
          }
        />
        <Route
          path='/reset/:token'
          element={<PasswordResetMiddleware />}
        />
        <Route
          path='/*'
          element={<DashboardRouter />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter;