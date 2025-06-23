import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Link, usePage } from "@inertiajs/inertia-react";

// Fix for default icon not showing
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import Hero from "../../common/hero";
import translations from "../../../lang/lang";
import { Button } from "antd";

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function MapTourSection() {
    const {
        touristCoordinates = [],
        villageCoordinates = [],
        accomodationCoordinates = [],
        restaurantCoordinates = [],
        creativeEconomyCoordinates = [],
        healthFacilityCoordinates = [],
        tranportationCoordinates = [],
        locale,
    } = usePage().props;

    const t = translations[locale || "id"];

    const allCoordinates = [
        ...touristCoordinates.map((coord) => ({
            ...coord,
            type: "destinasi",
        })),
        ...villageCoordinates.map((coord) => ({
            ...coord,
            type: "desa-wisata",
        })),
        ...accomodationCoordinates.map((coord) => ({
            ...coord,
            type: "akomodasi",
        })),
        ...restaurantCoordinates.map((coord) => ({
            ...coord,
            type: "restoran",
        })),
        ...creativeEconomyCoordinates.map((coord) => ({
            ...coord,
            type: "ekonomi-kreatif",
        })),
        ...healthFacilityCoordinates.map((coord) => ({
            ...coord,
            type: "fasilitas-kesehatan",
        })),
        ...tranportationCoordinates.map((coord) => ({
            ...coord,
            type: "transportasi",
        })),
    ];

    return (
        <div>
            <Hero
                image="/assets/images/hero-map-tour.png"
                title={t.mapTour.hero.title}
                description={t.mapTour.hero.description}
            />
            <div style={{ padding: 32 }}>
                <MapContainer
                    center={[-8.37, 114.64]}
                    zoom={11}
                    scrollWheelZoom={true}
                    style={{ height: "600px", width: "100%", borderRadius: 16 }}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {allCoordinates.map((item, index) => (
                        <Marker
                            key={index}
                            position={[
                                parseFloat(item.latitude),
                                parseFloat(item.longitude),
                            ]}
                        >
                            <Popup>
                                <strong>{item.name}</strong>
                                <br />
                                Tipe: {t.mapTour.type[item.type] ?? item.type}
                                <br />
                                <Button
                                    href={`/detail-destination/?id=${item.id}&type=${item.type}&lang=${locale}`}
                                    size="small"
                                    type="primary"
                                    style={{ marginTop: 8, color: "#fff" }}
                                    block
                                >
                                    Detail
                                </Button>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </div>
    );
}
