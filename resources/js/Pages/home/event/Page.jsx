import { usePage } from "@inertiajs/inertia-react";
import HomeLayout from "../../../components/container/home-layout";
import EventContent from "../../../components/content/event-home-page";

export default function Event() {
    const { locale } = usePage().props;
    return (
        <HomeLayout locale={locale}>
            <EventContent />
        </HomeLayout>
    );
}
