import Swal from "sweetalert2";
import { fetchWhitToken, fetchWhitTokenFormData, fetchWithOutToken } from "../helpers/fetch";
import { types } from "../types/types";

const travelLoadTravelsAsync=()=>{
  return async (dispatch)=>{
    const response=await fetchWithOutToken('travel');
    const body=await response.json();

    if(body.ok){
      dispatch(travelLoadTravels(body.travels));
    }else{
      console.log(body.msg);
    }
  }
}

const travelLoadTravels=(travels)=>({
  type:types.travelLoadTravels,
  payload:travels
})

const travelCreateTravelAsync=(disponibilidad,precio,fechaInicio,fechaFin,lugar,descripcion,incluye,noIncluye,fotoUrl)=>{
  return async (dispatch)=>{
    const response=await fetchWhitToken('travel',{disponibilidad,precio,fechaInicio,fechaFin,lugar,descripcion,incluye,noIncluye,fotoUrl},'POST');
    const body=await response.json();

    if(body.ok){
      Swal.fire('OK', 'Creado correctamente', 'success');
    }else{
      console.log(body);
      Swal.fire('Error',body.msg, 'error');
    }
  }
}

const travelUpdateTravelAsync=(id,disponibilidad,precio,fechaInicio,fechaFin,lugar,descripcion,incluye,noIncluye,fotoUrl)=>{
  return async (dispatch)=>{
    const response=await fetchWhitToken(`travel/${id}`,{disponibilidad,precio,fechaInicio,fechaFin,lugar,descripcion,incluye,noIncluye,fotoUrl},'PUT');
    const body=await response.json();

    if(body.ok){
      Swal.fire('OK', 'Guardado correctamente', 'success');
    }else{
      console.log(body);
      Swal.fire('Error',body.msg, 'error');
    }
  }
}

const travelUploadTravelPicture=(formData)=>{
  return async ()=>{
    const response = await fetchWhitTokenFormData('travel/upload/travels', formData, 'POST');
    const body = await response.json();

    if(body.ok){
      return body.url;
    }else{
      console.log(body);
      Swal.fire('Error', body.msg, 'error');
    }
  }
}

const travelDeleteTravelsAsync=(id)=>{
  return async (dispatch)=>{
    const response=await fetchWhitToken(`travel/${id}`,{},'DELETE');
    const body=await response.json();

    if(body.ok){
      Swal.fire('OK', 'Eliminado correctamente', 'success');
      dispatch(travelDeleteTravel(id));
    }else{
      console.log(body);
      Swal.fire('Error',body.msg, 'error');
    }
  }
}

const travelDeleteTravel=(id)=>({
  type:types.travelDeleteTravel,
  payload:id
})

const travelReservationEmailAsync=(nombre,destino,precio,personas,telefono,correo,comentario)=>{
  return async (dispatch)=>{
    const response=await fetchWhitToken('travel/email',{nombre,destino,precio,personas,telefono,correo,comentario},'POST');
    const body=await response.json();

    if(body.ok){
      Swal.fire('OK', 'Envíado correctamente', 'success');
    }else{
      console.log(body);
      Swal.fire('Error','Error al enviar', 'error');
    }
  }
}

export {
  travelLoadTravelsAsync,
  travelDeleteTravelsAsync,
  travelUpdateTravelAsync,
  travelCreateTravelAsync,
  travelUploadTravelPicture,
  travelReservationEmailAsync
}