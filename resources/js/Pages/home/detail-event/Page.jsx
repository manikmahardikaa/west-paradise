import { usePage } from "@inertiajs/inertia-react";
import HomeLayout from "../../../components/container/home-layout";
import DetailEventContent from "../../../components/content/detail-event";

export default function EventDetail() {
    const { locale } = usePage().props;
    return (
        <HomeLayout locale={locale}>
            <DetailEventContent />
        </HomeLayout>
    );
}
