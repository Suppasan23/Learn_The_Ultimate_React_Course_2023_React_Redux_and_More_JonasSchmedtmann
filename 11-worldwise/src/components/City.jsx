import { useParams } from "react-router-dom";
//import { useSearchParams } from 'react-router-dom';
import styles from "./City.module.css";
import { CitiesContext_Using } from "../contexts/CitiesContext";
import { useEffect } from "react";
import ShowTheFlag from "./ShowTheFlag";
import Spinner from "./Spinner";

function City() {

  const { id } = useParams();
  const { getSelectedCity, selectedCity, formatDate, isLoading } = CitiesContext_Using();

  /*const [searchParams, setSearchParams] = useSearchParams();

  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");*/

  const { cityName, country, date, notes } = selectedCity;

  console.log(country)

  useEffect(() => {
    getSelectedCity(id);
  }, [id])

  if(isLoading) return <Spinner />;

  return (
    <>
      <h1>City</h1>
      <h1>Id: {id}</h1>
      {/*<h1>Position : {lat}, {lng}</h1>*/}
    
      <div className={styles.city}>
        <div className={styles.row}>
          <h6>{id}</h6>
          <h6>City name</h6>
          <h3>
          <ShowTheFlag bool={true}  country={country} id={id}/>
          </h3>
        </div>

        <div className={styles.row}>
          <h6>You went to {cityName} on</h6>
          <p>{formatDate(date || null)}</p>
        </div>

        {notes && (
          <div className={styles.row}>
            <h6>Your notes</h6>
            <p>{notes}</p>
          </div>
        )}

        <div className={styles.row}>
          <h6>Learn more</h6>
          <a
            href={`https://en.wikipedia.org/wiki/${cityName}`}
            target="_blank"
            rel="noreferrer"
          >
            Check out {cityName} on Wikipedia &rarr;
          </a>
        </div>

        <div>
          
        </div>
      </div>
    </>
  );
}

export default City;
