import { types } from "../types/types";

const initialState = {
    modalOpen: false,
    modalOpenMenu: false,
    msgError: null,
    loading: false
}

const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.uiOpenModal:
            return {
                ...state,
                modalOpen: true
            }
        case types.uiCloseModal:
            return {
                ...state,
                modalOpen: false
            }
        case types.uiOpenModalMenu:
            return {
                ...state,
                modalOpenMenu: true
            }
        case types.uiCloseModalMenu:
            return {
                ...state,
                modalOpenMenu: false
            }
        case types.uiSetError:
            return {
                ...state,
                msgError: action.payload
            }
        case types.uiRemoveError:
            return {
                ...state,
                msgError: null
            }
        case types.uiSetLoading:
            return {
                ...state,
                loading: true
            }
        case types.uiRemoveLoading:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
}

export default uiReducer;