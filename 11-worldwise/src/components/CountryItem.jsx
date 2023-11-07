import styles from "./CountryItem.module.css";
import ShowTheFlag from "./ShowTheFlag";

function CountryItem({ country }) {

  return (
    <li className={styles.countryItem}>
      <ShowTheFlag bool={false} country={country.country} />
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
