import { Link } from 'react-router-dom';
import styles from './CityItem.module.css'
import { CitiesContext_Using } from '../contexts/CitiesContext';
import ShowTheFlag from './ShowTheFlag';

function CityItem({ city }) {

    const { selectedCity, formatDate, deleteBookingCity } = CitiesContext_Using();
    const { cityName, country, date, id, position } = city;

    function handleDeleteBtnClick(e) {
      e.preventDefault();
      console.log("TEST")
      deleteBookingCity(id);
    }

    return (
      <>
        <li style={{ listStyleType: 'none' }}>
          <Link className={`${styles.cityItem} ${id===selectedCity.id ? styles['cityItem--active'] : ""}`} to={`${id}?lat=${position.lat}&lng=${position.lng}`}>
            <ShowTheFlag bool={false} country={country} id={id}/>
            <h3 className={styles.name}>{cityName}</h3>
            <time className={styles.date}>{formatDate(date)}</time>
            <button className={styles.deleteBtn} onClick={handleDeleteBtnClick}>&times;</button>
          </Link>
        </li>
      </>
    )
}

export default CityItem;