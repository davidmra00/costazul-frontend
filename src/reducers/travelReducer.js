import { types } from "../types/types";

const initialState={
  checking:true,
  travels:[]
}

const travelReducer=(state=initialState,action)=>{
  switch (action.type) {
    case types.travelLoadTravels:
      return {
        ...state,
        travels:[...action.payload],
        checking:false
      }
    case types.travelDeleteTravel:
      return {
        ...state,
        travels:state.travels.filter(travel=>(travel._id!==travel.action.payload)),
        checking:false
      }
    default:
      return state;
  }
}

export default travelReducer;