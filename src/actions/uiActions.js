import { types } from "../types/types";

export const uiOpenModal=()=>({
    type:types.uiOpenModal,
});

export const uiCloseModal=()=>({
    type:types.uiCloseModal,
});

export const uiOpenModalMenu=()=>({
    type:types.uiOpenModalMenu,
});

export const uiCloseModalMenu=()=>({
    type:types.uiCloseModalMenu,
});

export const setError=(err)=>({
    type:types.uiSetError,
    payload:err
});

export const removeError=()=>({
    type:types.uiRemoveError
});

export const uiSetLoading=()=>({
    type:types.uiSetLoading
});

export const uiRemoveLoading=()=>({
    type:types.uiRemoveLoading
});