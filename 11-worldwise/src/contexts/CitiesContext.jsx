import { createContext, useContext, useEffect, useReducer} from "react";

const CitiesContext = createContext();
const BASE_URL = "http://localhost:8000";

function CitiesContext_Provider({ children }) {

  const [{cities, isLoading, selectedCity}, dispatch] = useReducer((state, action)=>
  {//reducer
    switch(action.type){

      case 'loading' :  return  { ...state, 
                                  isLoading: true,
                                }

      case 'cities/loaded' :  return  { ...state, 
                                        isLoading: false, 
                                        cities: action.payload,
                                      }

      case 'selectedCity/loaded' :return  { ...state, 
                                            isLoading: false, 
                                            selectedCity: action.payload,
                                          }

      case 'city/created' : return  { ...state, 
                                      isLoading: false, 
                                      cities: [...state.cities, action.payload],
                                      selectedCity: action.payload,
                                    }

      case 'city/deleted' : return  { ...state, 
                                      isLoading: false, 
                                      cities: [...state.cities.filter((city) => city.id !== action.payload)],
                                      selectedCity: {},
                                    }

      case 'rejected' : return  { ...state,
                                  isLoading: false, 
                                  error: action.payload,
                                }

      default: throw new Error("Unknown action type");
    }
  },
  {//initialState
    cities: [],
    isLoading: false,
    selectedCity: {},
    error: "",
  })

  useEffect(() => {
    fetchCities();
  }, []);

  const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

  async function fetchCities() {
    dispatch({type: "loading"});
    try {
      const res = await fetch(`${BASE_URL}/cities`);
      const data = await res.json();
      dispatch({type: "cities/loaded", payload: data});
    } catch {
      dispatch({type:"rejected", payload:"There was an error loading cities..."});
    }
  }

  async function getSelectedCity(id){
    if( Number(id) === selectedCity.id ) return;
    dispatch({type: "loading"});

    try {
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        dispatch({ type:"selectedCity/loaded", payload: data });
    } catch {
        dispatch({type:"rejected", payload:"There was an error loading the select city..."});
    }
  }

  async function createBookingCity(newCity){
    dispatch({type: "loading"});
    try {
        const res = await fetch(`${BASE_URL}/cities`, {
          method: "POST",
          body: JSON.stringify(newCity),
          headers: {
            "Content-Type": "application/json"
          },
        });
        const data = await res.json();
        dispatch({ type:"city/created", payload:data })
    } catch {
        dispatch({type:"rejected", payload:"There was an error creating data..."});
    }
  }

  async function deleteBookingCity(id){
    dispatch({type: "loading"});
    try {
        await fetch(`${BASE_URL}/cities/${id}`, {
          method: "DELETE",
        });
        dispatch({ type:"city/deleted", payload:id })
    } catch {
        dispatch({type:"rejected", payload:"There was an error deleting data..."});
    } 
  }
  
  return (
    <CitiesContext.Provider 
     value={{   cities, 
                selectedCity,
                getSelectedCity, 
                createBookingCity,
                deleteBookingCity,
                formatDate,
                isLoading }}>
     {children}
    </CitiesContext.Provider>
  );
}

function CitiesContext_Using(){
    const x = useContext(CitiesContext);
    if(x === undefined) throw new console.error("CitiesContext_Using was used outside the CitiesContext_Provider");
    return(x)
}

export {CitiesContext_Provider, CitiesContext_Using};