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