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

export const SidebarMain = () => [
    {
        key: "/dashboard/home",
        label: <Link href="/dashboard/home">Dashboard</Link>,
        icon: <ProductFilled />,
    },
];
