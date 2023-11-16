import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
    isLoading: false,
}

const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        deposit(state, action) {
            state.balance = state.balance + action.payload;
        },

        withdraw(state, action) {
            state.balance = state.balance - action.payload;
        },

        requestLoan(state, action) {
            if (state.loan > 0) return;
        
            const { 
                loanAmountSent: loanAmountRecieve , 
                loanPurposeSent: loanPurposeRecieve 
            } = action.payload;
        
            console.log(loanAmountRecieve);
            console.log(loanPurposeRecieve);
            state.loan = loanAmountRecieve;
            state.loanPurpose = loanPurposeRecieve;
            state.balance = state.balance + loanAmountRecieve;
        },
        

        payLoan(state) {
            state.balance = state.balance - state.loan;
            state.loan = 0;
            state.loanPurpose = "";
        },
        convertingCurrency(state, action) {
            state.isLoading = action.payload;
        },
    }
});

console.log(accountSlice);

export const {deposit, withdraw, requestLoan, payLoan, convertingCurrency} = accountSlice.actions

export default accountSlice.reducer;