import Swal from 'sweetalert2';
import { fetchWhitToken, fetchWithOutToken } from "../helpers/fetch"
import { types } from "../types/types";
import { setError, uiRemoveLoading } from "./uiActions";

const authLoginAsync = (correo, contrasenna) => {
  return async (dispatch) => {
    const data = {
      correo,
      contrasenna
    }
    const response = await fetchWithOutToken('auth/login', data, 'POST');
    const body = await response.json();
    const { uid, nombre, admin, verificado, fotoUrl } = body;

    if (body.ok) {
      localStorage.setItem('token', body.token);

      dispatch(authLogin({
        uid,
        nombre,
        admin,
        verificado,
        fotoUrl
      }));
    } else {
      console.log(body);
      dispatch(setError(body.msg));
    }
  }
}

const authGoogleLoginAsync = (nombre,correo) => {
  return async (dispatch) => {
    const data = {
      nombre,
      correo
    }

    const response = await fetchWithOutToken('auth/google', data, 'POST');
    const body = await response.json();
    const { uid, admin, verificado, fotoUrl } = body;

    if (body.ok) {
      localStorage.setItem('token', body.token);

      dispatch(authLogin({
        uid,
        nombre: body.nombre,
        admin,
        verificado,
        fotoUrl
      }));
    } else {
      console.log(body);
      dispatch(setError(body.msg));
    }
  }
}


export const authLogin = (user) => ({
  type: types.authLogin,
  payload: user
})

const authRegisterAsync = (nombre, correo, contrasenna) => {
  return async (dispatch) => {
    const data = {
      nombre,
      correo,
      contrasenna
    }
    const response = await fetchWithOutToken('auth/register', data, 'POST');
    const body = await response.json();
    const { uid, admin, verificado, fotoUrl } = body;

    if (body.ok) {
      localStorage.setItem('token', body.token);

      dispatch(authLogin({
        uid,
        nombre: body.nombre,
        admin,
        verificado,
        fotoUrl
      }));
    } else {
      console.log(body);
      dispatch(setError(body.msg));
    }
  }
}

const authForgetPasswordAsync = (correo) => {
  return async (dispatch) => {
    const response = await fetchWithOutToken('auth/password', { correo }, 'POST');
    const body = await response.json();
    if (body.ok) {
      Swal.fire('OK', body.msg, 'success');
    } else {
      console.log(body);
      dispatch(setError(body.msg));
    }
  }
}

const authResetPasswordAsync = (token, contrasenna) => {
  return async (dispatch) => {
    const response = await fetchWithOutToken(`auth/reset/${token}`, { contrasenna }, 'POST');
    const body = await response.json();
    if (body.ok) {
      Swal.fire('OK', 'Contraseña cambiada correctamente', 'success');
    } else {
      console.log(body);
      dispatch(setError(body.msg));
    }
  }
}

const authRenewalAsync = () => {
  return async (dispatch) => {
    try {
      const response = await fetchWhitToken('auth');
      const body = await response.json();

      localStorage.setItem('token', body.token);

      dispatch(authLogin({
        uid: body.uid,
        nombre: body.nombre,
        admin: body.admin,
        verificado: body.verificado,
        fotoUrl: body.fotoUrl
      }));
      dispatch(authCheckingFinish());
    } catch (err) {
      console.log(err);
      dispatch(authCheckingFinish());
    }
  }
}

const authCheckingFinish = () => ({
  type: types.authCheckingFinish
})

const authLogoutLogic = () => {
  return (dispatch) => {
    localStorage.clear();

    dispatch(authLogout());
    dispatch(uiRemoveLoading());
  }
}

const authLogout = () => ({
  type: types.authLogout,
})

export {
  authLoginAsync,
  authGoogleLoginAsync,
  authRegisterAsync,
  authCheckingFinish,
  authForgetPasswordAsync,
  authResetPasswordAsync,
  authRenewalAsync,
  authLogoutLogic
}