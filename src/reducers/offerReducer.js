import { types } from "../types/types";

const initialState={
  checking:true,
  offers:[]
}

const offerReducer=(state=initialState,action)=>{
  switch (action.type) {
    case types.offerLoadOffers:
      return {
        ...state,
        offers:[...action.payload],
        checking:false
      }
    case types.offerDeleteOffer:
      return {
        ...state,
        offers:state.offers.filter(offer=>(offer._id!==offer.action.payload)),
        checking:false
      }
    default:
      return state;
  }
}

export default offerReducer;