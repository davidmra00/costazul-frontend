import { fetchWhitToken, fetchWhitTokenFormData, fetchWithOutToken } from "../helpers/fetch";
import Swal from 'sweetalert2';
import { setError } from "./uiActions";
import { authCheckingFinish, authLogin, authLogoutLogic } from './authActions';

export const userGetUsersAsync = () => {
  return async () => {
    const response = await fetchWhitToken('user');
    const body = await response.json();

    if (body.ok) {
      const users = body.users;
      return users;
    } else {
      console.log(body);
      Swal.fire('Error', body.msg, 'error');
    }
  }
}

export const userCreatebyAdminAsync = (nombre, correo, contrasenna, admin, verificado, fotoUrl) => {
  return async (dispatch) => {
    const data = {
      nombre,
      correo,
      contrasenna,
      admin,
      verificado,
      fotoUrl
    }
    const response = await fetchWhitToken('user', data, 'POST');
    const body = await response.json();

    if (body.ok) {
      Swal.fire('OK', 'Creado correctamente', 'success');
    } else {
      console.log(body);
      dispatch(setError(body.msg));
    }
  }
}

export const userUpdateAsync = (nombre, contrasenna, fotoUrl) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth

    let body;

    if (contrasenna) {
      const response = await fetchWhitToken(`user/${uid}`, { nombre, contrasenna, fotoUrl }, 'PUT');
      body = await response.json();
    } else {
      const response = await fetchWhitToken(`user/${uid}`, { nombre, fotoUrl }, 'PUT');
      body = await response.json();
    }

    if (body.ok) {
      localStorage.setItem('token', body.token);

      const { uid, nombre, admin, verificado, fotoUrl } = body;

      dispatch(authLogin({
        uid,
        nombre,
        admin,
        verificado,
        fotoUrl
      }));
      Swal.fire('OK', 'Guardado correctamente', 'success');
    } else {
      console.log(body);
      dispatch(setError(body.msg));
    }
  }
}

export const userUpdatebyAdminAsync = (id, nombre, correo, contrasenna, admin, verificado, fotoUrl) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    let body;

    if (contrasenna) {
      const response = await fetchWhitToken(`user/${id}`, { nombre, correo, contrasenna, admin, verificado, fotoUrl }, 'PUT');
      body = await response.json();
    } else {
      const response = await fetchWhitToken(`user/${id}`, { nombre, correo, admin, verificado, fotoUrl }, 'PUT');
      body = await response.json();
    }

    if (body.ok) {
      if (id === uid) {
        localStorage.setItem('token', body.token);

        const { uid, nombre, admin, verificado, fotoUrl } = body;

        dispatch(authLogin({
          uid,
          nombre,
          admin,
          verificado,
          fotoUrl
        }));
      }
      Swal.fire('OK', 'Guardado correctamente', 'success');
    } else {
      console.log(body);
      dispatch(setError(body.msg));
    }
  }
}

export const userUploadProfilePicture = (formData) => {
  return async () => {
    const response = await fetchWhitTokenFormData('user/upload/profiles', formData, 'POST');
    const body = await response.json();

    if (body.ok) {
      return body.url;
    } else {
      console.log(body);
      Swal.fire('Error', body.msg, 'error');
    }
  }
}

export const userEmailVerification = () => {
  return async (dispatch) => {
    const response = await fetchWhitToken('auth/email');
    const body = await response.json();

    if (body.ok) {
      Swal.fire('OK', 'Se le ha mandado un correo de verificación', 'success');
    } else {
      console.log(body);
      Swal.fire('Error', body.msg, 'error');
    }
  }
}

export const userAccountVerification = (token) => {
  return async (dispatch) => {
    const response = await fetchWithOutToken(`auth/email/${token}`);
    const body = await response.json();

    if (body.ok) {
      localStorage.setItem('token', body.token);

      const { uid, nombre, admin, verificado, fotoUrl } = body;
      
      dispatch(authLogin({
        uid,
        nombre,
        admin,
        verificado,
        fotoUrl
      }));
      Swal.fire('OK', 'Cuenta verificada correctamente', 'success');
    } else {
      console.log(body);
      Swal.fire('Error', body.msg, 'error');
    }
  }
}

export const userDeleteAsync = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth

    const response = await fetchWhitToken(`user/${uid}`, {}, 'DELETE');
    const body = await response.json();

    if (body.ok) {
      Swal.fire('OK', 'Eliminado correctamente', 'success');
      dispatch(authLogoutLogic());
      dispatch(authCheckingFinish());
    } else {
      console.log(body);
      Swal.fire('Error', body.msg, 'error');
    }
  }
}

export const userDeletebyAdminAsync = (id) => {
  return async (dispatch) => {
    const response = await fetchWhitToken(`user/${id}`, {}, 'DELETE');
    const body = await response.json();

    if (body.ok) {
      Swal.fire('OK', 'Eliminado correctamente', 'success');
    } else {
      console.log(body);
      Swal.fire('Error', body.msg, 'error');
    }
  }
}