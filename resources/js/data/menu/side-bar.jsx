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
        icon: <ProductFilled />,
    },
    {
        key: "/dashboard/villages",
        label: <Link href="/dashboard/villages">Desa Wisata</Link>,
        icon: <HomeFilled />,
    },
    {
        key: "/dashboard/restaurants",
        label: <Link href="/dashboard/restaurants">Restoran</Link>,
        icon: <ShopFilled />,
    },
    {
        key: "/dashboard/creative-economy",
        label: <Link href="/dashboard/creative-economy">Ekonomi Kreatif</Link>,
        icon: <BulbFilled />,
    },
    {
        key: "/dashboard/accommodations",
        label: <Link href="/dashboard/accommodations">Akomodasi</Link>,
        icon: <HomeFilled />,
    },
    {
        key: "/dashboard/transportations",
        label: <Link href="/dashboard/transportations">Transportasi</Link>,
        icon: <CarFilled />,
    },
    {
        key: "/dashboard/health-facilities",
        label: (
            <Link href="/dashboard/health-facilities">Fasilitas Kesehatan</Link>
        ),
        icon: <MedicineBoxFilled />,
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
