import { createSlice } from "@reduxjs/toolkit";

//Initial Customer//////////////////////////////////////////////////////////////////////////////////////////////////
const initialState = {
    fullName: "",
    nationalID: "",
    createAt: "",
}

const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        createCustomer(state, action){
            const {
                sendFullName: recieveFullName,
                sendNationalId: recieveNationalId,
            } = action.payload;

            state.fullName = recieveFullName;
            state.nationalID = recieveNationalId;
            state.createAt = new Date().toISOString();
        },

        updateName(state, action) {
            state.fullName = action.payload
        }
    }
})

console.log(customerSlice);

export const {createCustomer, updateName} = customerSlice.actions

export default customerSlice.reducer;


/* //Customer Reducer/////////////////////////////////////////////////////////////////
export default function customerReducer(state = initialStateCustomer, action) {
    switch(action.type) {
        case "customer/createCustomer" :
            return { ...state,
                fullName: action.payload.fullName,
                nationalID: action.payload.nationalID,
                createAt: action.payload.createAt,
            };
        case "customer/updateName" :
            return {...state,
                fullName: action.payload,
            }

        default: return state
    }
}

//Customer Action Creator/////////////////////////////////////////////////////////////////
export function createCustomer(fullName, nationalID){
    return {type: "customer/createCustomer", payload: {fullName, nationalID, createAt: new Date().toISOString()}};
}
export function updateName(fullName) {
    return {type: "customer/updateName", payload: fullName}
} */