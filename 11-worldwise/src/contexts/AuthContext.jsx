import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const FAKE_USER = {
    name: "Jack",
    email: "jack@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
  };

function AuthContext_Provider({children}){

    const [{user, isAuthenticated}, dispatch] = useReducer((state, action)=>
    {//reducer
        switch (action.type) {

            case 'login':   return  {
                ...state, 
                user: action.payload,
                isAuthenticated: true,
            }

            case 'logout':   return  {
                ...state, 
                user: null,
                isAuthenticated: false,
            }
                
            default: throw new Error("unknown action");
        }
    },
    {//initialState
        user: null,
        isAuthenticated: false,
    })

    function login(email, password){
        if((email === FAKE_USER.email)&&(password === FAKE_USER.password)){
            dispatch({ type: 'login', payload: FAKE_USER })
        }
    }

    function logout(){
        dispatch({ type: 'logout' })
    }

    return (
    <AuthContext.Provider value={{
        user,
        isAuthenticated,
        login,
        logout,
    }}>
    {children}
    </AuthContext.Provider>
    )
}

function AuthContext_Using(){
    const x = useContext(AuthContext)
    if(x === undefined) throw new console.error("AuthContext_Using was used outside the AuthContext_Provider");
}

export {AuthContext_Provider, AuthContext_Using};