import { usePage } from "@inertiajs/inertia-react";
import HomeLayout from "../../../components/container/home-layout";
import DetailNewsContent from "../../../components/content/detail-news";

export default function DetailNews() {
    const { locale } = usePage().props;
    return (
        <HomeLayout locale={locale}>
            <DetailNewsContent />
        </HomeLayout>
    );
}
