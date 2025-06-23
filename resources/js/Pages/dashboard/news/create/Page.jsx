import { Inertia } from "@inertiajs/inertia";
import FormNews from "../../../../components/common/form/news";
import { notification } from "antd";
import Layout from "../../Layout";

export default function CreateNews() {
    const handleSubmit = (values) => {
        Inertia.post("/dashboard/news", values, {
            onSuccess: () => {
                notification.success({
                    message: "Berhasil",
                    description: "Berita berhasil ditambahkan.",
                });
            },
            onError: (errors) => {
                notification.error({
                    message: "Gagal",
                    description:
                        errors.name ||
                        "Terjadi kesalahan saat menambahkan berita.",
                });
            },
        });
    };

    const handleCancel = () => {
        Inertia.visit("/dashboard/news");
    };

    return (
        <FormNews
            process="create"
            title="Tambah Berita"
            onSubmit={handleSubmit}
            onCancel={handleCancel}
        />
    );
}

CreateNews.layout = (page) => <Layout children={page} />;
