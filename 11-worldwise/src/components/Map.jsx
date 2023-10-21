import styles from './Map.module.css'
import { Link } from "react-router-dom";

function Map() {
    return (
        <div className={styles.mapContainer}>
            <Link to="/">Back</Link>
            Map
        </div>
    )
}

export default Map;
