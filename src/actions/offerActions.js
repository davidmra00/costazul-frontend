import Swal from "sweetalert2";
import { fetchWhitToken, fetchWhitTokenFormData, fetchWithOutToken } from "../helpers/fetch";
import { types } from "../types/types";

const offerLoadOffersAsync=()=>{
  return async (dispatch)=>{
    const response=await fetchWithOutToken('offer');
    const body=await response.json();

    if(body.ok){
      dispatch(offerLoadOffers(body.offers));
    }else{
      console.log(body.msg);
    }
  }
}

const offerLoadOffers=(offers)=>({
  type:types.offerLoadOffers,
  payload:offers
})

const offerCreateOfferAsync=(disponibilidad,precio,fechaInicio,fechaFin,lugar,descripcion,incluye,noIncluye,fotoUrl)=>{
  return async (dispatch)=>{
    const response=await fetchWhitToken('offer',{disponibilidad,precio,fechaInicio,fechaFin,lugar,descripcion,incluye,noIncluye,fotoUrl},'POST');
    const body=await response.json();

    if(body.ok){
      Swal.fire('OK', 'Creado correctamente', 'success');
    }else{
      console.log(body);
      Swal.fire('Error',body.msg, 'error');
    }
  }
}

const offerUpdateOfferAsync=(id,disponibilidad,precio,fechaInicio,fechaFin,lugar,descripcion,incluye,noIncluye,fotoUrl)=>{
  return async (dispatch)=>{
    const response=await fetchWhitToken(`offer/${id}`,{disponibilidad,precio,fechaInicio,fechaFin,lugar,descripcion,incluye,noIncluye,fotoUrl},'PUT');
    const body=await response.json();

    if(body.ok){
      Swal.fire('OK', 'Guardado correctamente', 'success');
    }else{
      console.log(body);
      Swal.fire('Error',body.msg, 'error');
    }
  }
}

const offerUploadOfferPicture=(formData)=>{
  return async ()=>{
    const response = await fetchWhitTokenFormData('offer/upload/offers', formData, 'POST');
    const body = await response.json();

    if(body.ok){
      return body.url;
    }else{
      console.log(body);
      Swal.fire('Error', body.msg, 'error');
    }
  }
}

const offerDeleteOffersAsync=(id)=>{
  return async (dispatch)=>{
    const response=await fetchWhitToken(`offer/${id}`,{},'DELETE');
    const body=await response.json();

    if(body.ok){
      Swal.fire('OK', 'Eliminado correctamente', 'success');
      dispatch(offerDeleteOffer(id));
    }else{
      console.log(body);
      Swal.fire('Error',body.msg, 'error');
    }
  }
}

const offerDeleteOffer=(id)=>({
  type:types.offerDeleteOffer,
  payload:id
})

export {
  offerLoadOffersAsync,
  offerDeleteOffersAsync,
  offerCreateOfferAsync,
  offerUpdateOfferAsync,
  offerUploadOfferPicture
}