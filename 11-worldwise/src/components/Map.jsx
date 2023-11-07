import { useNavigate, useSearchParams } from 'react-router-dom';
import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet"
import styles from './Map.module.css';
import { useState } from 'react';
import { CitiesContext_Using } from '../contexts/CitiesContext';
import ShowTheFlag from './ShowTheFlag';

function Map() {

    const navigate = useNavigate();

    const { cities } = CitiesContext_Using();

    const [mapPosition, setMapPosition] = useState([40, 0]);

    const [searchParams, setSearchParams] = useSearchParams();

    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");

    return (
        <div className={styles.mapContainer} onClick={() => {navigate("form")}}>

            <MapContainer center={mapPosition} zoom={13} scrollWheelZoom={true} className={styles.map}>
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {cities.map((city) => (
                    <Marker key={city.id} position={[city.position.lat, city.position.lng]}>
                        <Popup>
                            <ShowTheFlag bool={false} country={city.country}/>
                            <span>{city.cityName}</span>
                        </Popup>
                    </Marker>
                ))}

            </MapContainer>

            <button onClick={()=>setSearchParams({lat:50, lng:23})}>Change Position</button>
        </div>
    )
}

export default Map;