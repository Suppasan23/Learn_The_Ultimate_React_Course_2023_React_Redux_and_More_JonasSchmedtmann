import { createContext, useContext, useEffect, useState } from "react";

const CitiesContext = createContext();
const BASE_URL = "http://localhost:8000";

function CitiesContext_Provider({ children }) {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

  useEffect(() => {
    fetchCities();
  }, []);

  async function fetchCities() {
    setIsLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/cities`);
      const data = await res.json();
      setCities(data);
    } catch {
      alert("There was an error loading data...");
    } finally {
      setIsLoading(false);
    }
  }

  async function getSelectedCity(id){
    try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        setSelectedCity(data);
    } catch {
        alert("There was an error loading data...");
    } finally {
        setIsLoading(false);
    }
  }

  async function createBookingCity(newCity){
    try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`, {
          method: "POST",
          body: JSON.stringify(newCity),
          headers: {
            "Content-Type": "application/json"
          },
        });
        const data = await res.json();
        console.log(data)
        fetchCities();
    } catch {
        alert("There was an error creating data...");
    } finally {
        setIsLoading(false);
    }
  }
  
  return (
    <CitiesContext.Provider 
     value={{   cities, 
                selectedCity,
                getSelectedCity, 
                createBookingCity,
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