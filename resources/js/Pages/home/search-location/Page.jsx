import { usePage } from "@inertiajs/inertia-react";
import HomeLayout from "../../../components/container/home-layout";
import SearchLocationContent from "../../../components/content/search-location";

export default function SearchLoction() {
    const { locale } = usePage().props
    return (
        <HomeLayout locale={locale}>
            <SearchLocationContent />
        </HomeLayout>
    );
}
