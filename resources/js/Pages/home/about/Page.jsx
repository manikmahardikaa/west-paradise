import { usePage } from "@inertiajs/inertia-react";
import HomeLayout from "../../../components/container/home-layout";
import AboutContent from "../../../components/content/about";

export default function About() {
    const { locale } = usePage().props;
    return (
        <HomeLayout locale={locale}>
            <AboutContent locale={locale} />
        </HomeLayout>
    );
}
