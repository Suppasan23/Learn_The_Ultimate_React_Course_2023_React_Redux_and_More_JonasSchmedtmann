import { createContext, useContext, useEffect, useState } from "react";

const CitiesContext = createContext();

function CitiesContext_Provider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const BASE_URL = "http://localhost:8000";

  useEffect(() => {
    async function fetchCities() {
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

    fetchCities();
  }, []);

  return (
    <CitiesContext.Provider value={{ cities, isLoading }}>
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