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

        requestLoan: {
            prepare(amount, purpose) {
                return {
                    payload: {amount, purpose},
                };
            },
            reducer(state, action){
                if (state.loan > 0) return;
                state.loan = action.payload.amount;
                state.loanPurpose = action.payload.purpose;
                state.balance = state.balance + action.payload.amount;
            },
        },
        
        payLoan(state) {
            state.balance = state.balance - state.loan;
            state.loan = 0;
            state.loanPurpose = "";
        },
        convertingCurrency(state) {
            state.isLoading = true;
        },
    }
});

function changeCurrentcy(amount, currency) {
    if(currency === "USD") return { type: "account/deposit", payload: amount }

    return async function(dispatch, getState) {
        dispatch({ type: "account/convertingCurrency", payload: true });

        const res = await fetch(`https://${`api.frankfurter.app`}/latest?amount=${amount}&from=${currency}&to=USD`);
        const data = await res.json();
        const convertedAmount = data.rates.USD;

        dispatch({ type: "account/deposit", payload: convertedAmount });

        dispatch({ type: "account/convertingCurrency", payload: false });
    };
}

console.log(accountSlice);

export const {deposit, withdraw, requestLoan, payLoan} = accountSlice.actions

export default accountSlice.reducer;