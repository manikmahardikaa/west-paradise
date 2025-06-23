import { Link } from "@inertiajs/inertia-react";
import translations from "../../lang/lang";

export const NavbarMenu = (locale = "id") => {
    const t = translations[locale];

    const currentLang =
        new URLSearchParams(window.location.search).get("lang") || "id";

    return [
        {
            key: "/home-page",
            label: (
                <Link href={`/home-page?lang=${currentLang}`}>
                    {t.navbar?.homePage || "Beranda"}
                </Link>
            ),
        },
        {
            key: "/about",
            label: (
                <Link href={`/about?lang=${currentLang}`}>
                    {t.navbar?.about || "Tentang Kami"}
                </Link>
            ),
        },
        {
            key: "/destination",
            label: (
                <Link href={`/destination?lang=${currentLang}`}>
                    {t.navbar?.destination || "Destinasi Wisata"}
                </Link>
            ),
        },
        {
            key: "/event",
            label: (
                <Link href={`/event?lang=${currentLang}`}>
                    {t.navbar?.event || "Acara"}
                </Link>
            ),
        },
        {
            key: "/news",
            label: (
                <Link href={`/news?lang=${currentLang}`}>
                    {t.navbar?.news || "Berita"}
                </Link>
            ),
        },
        {
            key: "/map-tour",
            label: (
                <Link href={`/map-tour?lang=${currentLang}`}>
                    {t.navbar?.mapTour || "Peta"}
                </Link>
            ),
        },
        {
            key: "/search-location",
            label: (
                <Link href={`/search-location?lang=${currentLang}`}>
                    {t.navbar?.searchLocation || "Cari Lokasi"}
                </Link>
            ),
        },
    ];
};
