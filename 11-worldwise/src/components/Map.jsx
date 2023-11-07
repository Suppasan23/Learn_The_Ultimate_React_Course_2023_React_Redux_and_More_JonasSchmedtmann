import { useNavigate} from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet"
import styles from './Map.module.css';
import { useEffect, useState } from 'react';
import { CitiesContext_Using } from '../contexts/CitiesContext';
import ShowTheFlag from './ShowTheFlag';
import { useGeolocation } from '../hooks/useGeolocation';
import Button from './Button';
import { useUrlPosition } from '../hooks/useUrlPosition';

function Map() {
  const { cities } = CitiesContext_Using();

  const [mapPosition, setMapPosition] = useState([40, -100]);

  const [mapLat, mapLng] = useUrlPosition();

  const {
    isLoading: isLoadingPosition,
    position: geolocationPositon,
    getPosition
  } = useGeolocation();

  const navigate = useNavigate();

  function DetectClick() {
    useMapEvents({
      click: (e) => ChangeLatLng(e.latlng)
    });
  }
  
  function ChangeLatLng(latlng) {
    const { lat, lng } = latlng;
    navigate(`form?lat=${lat}&lng=${lng}`);
  }
  
  function ChangeCenter() {
    const map = useMap();
    map.setView(mapPosition);
    return null;
  }

  useEffect(() => {
    if (mapLat && mapLng) { 
      setMapPosition([mapLat, mapLng]);
    }
  }, [mapLat, mapLng]);

  useEffect(() => {
    if (geolocationPositon) {
      ChangeLatLng(geolocationPositon);
    }
  }, [geolocationPositon]);

  return (
    <div className={styles.mapContainer}>

        <Button type='position' onClick={getPosition}>
            {isLoadingPosition ? 'Loading...' : 'Use your position'}
        </Button>

        <MapContainer
            center={mapPosition}
            zoom={5}
            scrollWheelZoom={true}
            className={styles.map}>
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {cities.map((city) => (
            <Marker key={city.id} position={[city.position.lat, city.position.lng]}>
                <Popup>
                <ShowTheFlag bool={true} country={city.country} />
                <span>{city.cityName}</span>
                </Popup>
            </Marker>
            ))}
            <ChangeCenter />
            <DetectClick />
        </MapContainer>
    </div>
  );
}

export default Map;