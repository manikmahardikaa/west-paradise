import {
    ProductFilled,
    ShopFilled,
    BulbFilled,
    HomeFilled,
    CarFilled,
    MedicineBoxFilled,
    FileTextFilled,
    CalendarFilled,
} from "@ant-design/icons";
import { Link } from "@inertiajs/inertia-react";
import translations from "../../lang/lang";

export const HomePageMenu = ({ lang, locale }) => {
    const t = translations[locale || "id"];
    return [
        {
            key: "tourist-destinations",
            label: (
                <Link href={`/destination?lang=${lang}&type=destinasi`}>
                    {t.type.destinasi}
                </Link>
            ),
            icon: <ProductFilled />,
        },
        {
            key: "villages",
            label: (
                <Link href={`/destination?lang=${lang}&type=desa-wisata`}>
                    {t.type["desa-wisata"]}
                </Link>
            ),
            icon: <HomeFilled />,
        },
        {
            key: "restaurants",
            label: (
                <Link href={`/destination?lang=${lang}&type=restoran`}>
                    {t.type.restoran}
                </Link>
            ),
            icon: <ShopFilled />,
        },
        {
            key: "creative-economy",
            label: (
                <Link href={`/destination?lang=${lang}&type=ekonomi-kreatif`}>
                    {t.type["ekonomi-kreatif"]}
                </Link>
            ),
            icon: <BulbFilled />,
        },
        {
            key: "accommodations",
            label: (
                <Link href={`/destination?lang=${lang}&type=akomodasi`}>
                    {t.type.akomodasi}
                </Link>
            ),
            icon: <HomeFilled />,
        },
        {
            key: "transportations",
            label: (
                <Link href={`/destination?lang=${lang}&type=transportasi`}>
                    {t.type.transportasi}
                </Link>
            ),
            icon: <CarFilled />,
        },
        {
            key: "health-facilities",
            label: (
                <Link
                    href={`/destination?lang=${lang}&type=fasilitas-kesehatan`}
                >
                    {t.type["fasilitas-kesehatan"]}
                </Link>
            ),
            icon: <MedicineBoxFilled />,
        },
    ];
};
