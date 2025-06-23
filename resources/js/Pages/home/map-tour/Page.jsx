import { usePage } from "@inertiajs/inertia-react";
import HomeLayout from "../../../components/container/home-layout";
import MapTourContent from "../../../components/content/map-tour";

export default function MapTour() {
    const { locale } = usePage().props;
    return (
        <HomeLayout locale={locale}>
            <MapTourContent />
        </HomeLayout>
    );
}
