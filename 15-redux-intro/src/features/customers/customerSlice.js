//Initial Customer//////////////////////////////////////////////////////////////////////////////////////////////////
const initialStateCustomer = {
    fullName: "",
    nationalID: "",
    createAt: "",
}

//Customer Reducer/////////////////////////////////////////////////////////////////
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
}