import React from "react";
import MainLayout from "../../components/container/layout";
import { usePage } from "@inertiajs/inertia-react";

export default function Layout({ children }) {
    const auth = usePage().props.auth;
    const username = auth?.user?.name;

    return <MainLayout username={username}>{children}</MainLayout>;
}
