import { usePage } from "@inertiajs/inertia-react";
import HomeLayout from "../../../components/container/home-layout";
import DestinationContent from "../../../components/content/destination";

export default function Destination() {
    const { locale } = usePage().props;
    return (
        <HomeLayout locale={locale}>
            <DestinationContent />
        </HomeLayout>
    );
}
