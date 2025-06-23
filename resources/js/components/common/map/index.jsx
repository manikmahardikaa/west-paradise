import { useEffect, useState } from "react";
import { Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";

const icon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

export default function LocationMarker({ onLocationChange, initialPosition }) {
    const [position, setPosition] = useState(initialPosition || null);

    useEffect(() => {
        if (initialPosition) {
            setPosition(initialPosition);
        }
    }, [initialPosition]);

    useMapEvents({
        click(e) {
            setPosition(e.latlng);
            onLocationChange(e.latlng);
        },
    });

    return position ? <Marker position={position} icon={icon} /> : null;
}
