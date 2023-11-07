import { useNavigate, useSearchParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet"
import styles from './Map.module.css';
import { useEffect, useState } from 'react';
import { CitiesContext_Using } from '../contexts/CitiesContext';
import ShowTheFlag from './ShowTheFlag';
import { useGeolocation } from '../hooks/useGeolocation';
import Button from './Button';

function Map() {
  const { cities } = CitiesContext_Using();

  const [mapPosition, setMapPosition] = useState([40, 50]);

  const {
    isLoading: isLoadingPosition,
    position: geolocationPositon,
    getPosition
  } = useGeolocation();

  const [searchParams] = useSearchParams();
  const mapLat = searchParams.get("lat");
  const mapLng = searchParams.get("lng");

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

  console.log(mapPosition[0]);

  return (
    <div className={styles.mapContainer}>

      {((mapPosition[0] != geolocationPositon.lat) && (mapPosition[1] != geolocationPositon.lng)) &&
        <Button type='position' onClick={getPosition}>
        {isLoadingPosition ? 'Loading...' : 'Use your position'}
      </Button>}

      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker key={city.id} position={[city.position.lat, city.position.lng]}>
            <Popup>
              <ShowTheFlag bool={false} country={city.country} />
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
