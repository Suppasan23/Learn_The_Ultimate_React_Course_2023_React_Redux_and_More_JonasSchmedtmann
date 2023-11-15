import {combineReducers, createStore} from "redux";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";

const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer,
});

const store = createStore(rootReducer);

export default store;

/* //Account Dispatcher//////////////////////////////////////////////////////////////////////////////////////////////////
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
console.log(store.getState()); */