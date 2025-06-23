import React from "react";
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/inertia-react";
import { InertiaProgress } from "@inertiajs/progress";
import { ConfigProvider } from "antd";
import antdTheme from "./config/antdTheme";
import "leaflet/dist/leaflet.css";
import "react-quill/dist/quill.snow.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Inertia } from "@inertiajs/inertia";

const token = document
    .querySelector('meta[name="csrf-token"]')
    ?.getAttribute("content");
if (token) {
    Inertia.defaults = {
        ...Inertia.defaults,
        headers: {
            common: {
                "X-CSRF-TOKEN": token,
            },
        },
        withCredentials: true,
    };
}

const pages = import.meta.glob("./Pages/**/*.jsx");

createInertiaApp({
    resolve: async (name) => {
        const page = pages[`./Pages/${name}.jsx`];
        return page ? await page() : null;
    },
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(
            <ConfigProvider theme={antdTheme}>
                <App {...props} />
            </ConfigProvider>
        );
    },
});

InertiaProgress.init();
