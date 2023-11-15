import {combineReducers, createStore} from "redux";

//Initial Account//////////////////////////////////////////////////////////////////////////////////////////////////
const initialStateAccount = {
    balance: 0,
    loan: 0,
    loanPurpose: "",
};

//Initial Customer//////////////////////////////////////////////////////////////////////////////////////////////////
const initialStateCustomer = {
    fullName: "",
    nationalID: "",
    createAt: "",
}

//Account Reducer/////////////////////////////////////////////////////////////////
function accountReducer(state = initialStateAccount, action) {
    switch (action.type) {
        case "account/deposit":
            return { ...state, 
                balance: state.balance + action.payload,
            };

        case "account/withdraw":
            return { ...state, 
                balance: state.balance - action.payload,
            };

        case "account/requestLoan":
            if (state.loan > 0) return state;
            return { ...state, 
                loan: action.payload.amount, 
                loanPurpose: action.payload.purpose, 
                balance: state.balance + action.payload.amount,
            };

        case "account/payLoan":
            return { ...state, 
                loan: 0, loanPurpose: "", 
                balance: state.balance - state.loan, 
            };

        default: return state;
    }
}

//Customer Reducer/////////////////////////////////////////////////////////////////
function customerReducer(state = initialStateCustomer, action) {
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

const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer,
});

const store = createStore(rootReducer);

//Account Action Creator/////////////////////////////////////////////////////////////////
function deposit(amount) {
    return { type: "account/deposit", payload: amount }
}
function withdraw(amount) {
    return { type: "account/withdraw", payload: amount }
}
function requestLoan(amount, purpose) {
    return { type: "account/requestLoan", payload: {amount, purpose} }
}
function payLoan() {
    return { type: "account/payLoan" }
}

//Customer Action Creator/////////////////////////////////////////////////////////////////
function createCustomer(fullName, nationalID){
    return {type: "customer/createCustomer", payload: {fullName, nationalID, createAt: new Date().toISOString()}};
}
function updateName(fullName) {
    return {type: "customer/updateName", payload: fullName}
}

//Account Dispatcher//////////////////////////////////////////////////////////////////////////////////////////////////
store.dispatch(deposit(500));
store.dispatch(withdraw(200));
console.log(store.getState());

store.dispatch(requestLoan(1000, "Buy a cheap car"));
console.log(store.getState());

store.dispatch(payLoan());
console.log(store.getState());


//Customer Dispatcher//////////////////////////////////////////////////////////////////////////////////////////////////
store.dispatch(createCustomer("Lord Farquaad", "5478545856325"))
console.log(store.getState());

store.dispatch(deposit(250))
console.log(store.getState());

store.dispatch(updateName("Shrek"))
console.log(store.getState());