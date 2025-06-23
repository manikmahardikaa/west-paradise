import { usePage } from "@inertiajs/inertia-react";
import FormNews from "../../../../components/common/form/news";
import Layout from "../../Layout";
import { Inertia } from "@inertiajs/inertia";
import { notification } from "antd";

export default function EditNews() {
    const { news } = usePage().props;
    const handleFinish = async (values) => {
        Inertia.put(`/dashboard/news/${news.id}`, values, {
            onSuccess: () => {
                notification.success({
                    message: "Berhasil",
                    description: "Berita berhasil diperbarui.",
                });
            },
            onError: (errors) => {
                notification.error({
                    message: "Gagal",
                    description:
                        errors.name ||
                        "Terjadi kesalahan saat memperbarui berita.",
                });
            },
        });
    };

    const handleCancel = () => {
        Inertia.visit("/dashboard/news");
    };
    return (
        <FormNews
            process="update"
            title="Edit Berita"
            initialValues={news}
            onSubmit={handleFinish}
            onCancel={handleCancel}
        />
    );
}

EditNews.layout = (page) => <Layout children={page} />;
