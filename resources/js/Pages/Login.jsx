import { usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { notification } from "antd";
import LoginContent from "../components/content/login";

export default function Login() {
    const { props } = usePage();
    const errors = props.errors || {};

    const handleLogin = (values) => {
        Inertia.post("/login", values, {
            preserveState: true,
            onError: (errors) => {
                notification.error({
                    message: "Login Gagal",
                    description:
                        errors.email || "Terjadi kesalahan saat login.",
                });
            },
        });
    };

    return <LoginContent onSubmit={handleLogin} errors={errors} />;
}
