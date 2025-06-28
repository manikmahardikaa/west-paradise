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

export const SidebarMenu = () => [
    {
        key: "/dashboard/tourist-destinations",
        label: (
            <Link href="/dashboard/tourist-destinations">Destinasi Wisata</Link>
        ),
        icon: (
            <img
                src="/assets/icon/ikon_destinasi_wisata.png"
                alt="Destinasi Wisata"
                style={{ width: 20, height: 20, color: "grey" }}
            />
        ),
    },
    {
        key: "/dashboard/villages",
        label: <Link href="/dashboard/villages">Desa Wisata</Link>,
        icon: (
            <img
                src="/assets/icon/ikon_desa_wisata.png"
                alt="Desa Wisata"
                style={{ width: 20, height: 20 }}
            />
        ),
    },
    {
        key: "/dashboard/restaurants",
        label: <Link href="/dashboard/restaurants">Restoran</Link>,
        icon: (
            <img
                src="/assets/icon/ikon_restoran.png"
                alt="Restoran"
                style={{ width: 20, height: 20 }}
            />
        ),
    },
    {
        key: "/dashboard/creative-economy",
        label: <Link href="/dashboard/creative-economy">Ekonomi Kreatif</Link>,
        icon: (
            <img
                src="/assets/icon/ikon_ekraf.png"
                alt="Ekonomi Kreatif"
                style={{ width: 20, height: 20 }}
            />
        ),
    },
    {
        key: "/dashboard/accommodations",
        label: <Link href="/dashboard/accommodations">Akomodasi</Link>,
        icon: (
            <img
                src="/assets/icon/ikon_akomodasi.png"
                alt="Akomodasi"
                style={{ width: 20, height: 20 }}
            />
        ),
    },
    {
        key: "/dashboard/transportations",
        label: <Link href="/dashboard/transportations">Transportasi</Link>,
        icon: (
            <img
                src="/assets/icon/ikon_transportasi.png"
                alt="Transportasi"
                style={{ width: 20, height: 20 }}
            />
        ),
    },
    {
        key: "/dashboard/health-facilities",
        label: (
            <Link href="/dashboard/health-facilities">Fasilitas Kesehatan</Link>
        ),
        icon: (
                <img
                    src="/assets/icon/ikon_faskes.png"
                    alt="Fasilitas Kesehatan"
                    style={{ width: 20, height: 20 }}
                />
            ),
    },
    {
        key: "/dashboard/news",
        label: <Link href="/dashboard/news">Berita</Link>,
        icon: <FileTextFilled />,
    },
    {
        key: "/dashboard/events",
        label: <Link href="/dashboard/events">Acara</Link>,
        icon: <CalendarFilled />,
    },
    {
        key: "/dashboard/categories",
        label: <Link href="/dashboard/categories">Kategori</Link>,
        icon: <CalendarFilled />,
    },
    {
        key: "/dashboard/reviews",
        label: <Link href="/dashboard/reviews">Peringkat dan Ulasan</Link>,
        icon: <CalendarFilled />,
    },
];
