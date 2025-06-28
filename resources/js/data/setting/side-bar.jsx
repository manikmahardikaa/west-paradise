import { CalendarFilled, UserOutlined } from "@ant-design/icons";
import { Link } from "@inertiajs/inertia-react";

export const SidebarSetting = () => [
    {
        key: "/dashboard/sliders",
        label: <Link href="/dashboard/sliders">Slider</Link>,
        icon: <CalendarFilled />,
    },
    {
        key: "/dashboard/accounts",
        label: <Link href="/dashboard/accounts">Akun</Link>,
        icon: <UserOutlined />, 
    },
];
