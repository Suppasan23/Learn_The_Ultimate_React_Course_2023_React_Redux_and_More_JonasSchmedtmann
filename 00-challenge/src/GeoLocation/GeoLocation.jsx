import { usePosition } from "./usePosition"

export default function GeoLocation(){

    const { getPosition, isLoading, countClicks, position: { lat, lng } = {}, error } = usePosition();

    return(
        <>
            <h3>GeoLocation</h3><br/>

            <div>
            <button onClick={getPosition} disabled={isLoading}>
                Get my position
            </button>

            {isLoading && <p>Loading position...</p>}
            {error && <p>{error}</p>}
            {!isLoading && !error && lat && lng && (
                <p>
                Your GPS position:{" "}
                <a
                    target="_blank"
                    rel="noreferrer"
                    href={`https://www.openstreetmap.org/#map=16/${lat}/${lng}`}
                >
                    {lat}, {lng}
                </a>
                </p>
            )}

                <p>You requested position {countClicks} times</p>
            </div>
        </>
    )
}