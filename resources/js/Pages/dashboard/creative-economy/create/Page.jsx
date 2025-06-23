import { Inertia } from "@inertiajs/inertia";
import FormCreativeEconomy from "../../../../components/common/form/creative-economy";
import Layout from "../../Layout";
import { notification } from "antd";

export default function CreateCreativeEconomy() {
    const handleSubmit = (values) => {
        Inertia.post("/dashboard/creative-economy", values, {
            onSuccess: () => {
                notification.success({
                    message: "Berhasil",
                    description: "Ekonomi Kreatif berhasil ditambahkan.",
                });
                Inertia.visit("/dashboard/creative-economy");
            },
            onError: (errors) => {
                notification.error({
                    message: "Gagal",
                    description:
                        errors.name ||
                        "Terjadi kesalahan saat menambahkan ekonomi kreatif.",
                });
            },
        });
    };

    const handleCancel = () => {
        Inertia.visit("/dashboard/creative-economy");
    };
    return (
        <FormCreativeEconomy
            process="create"
            title="Tambah Ekonomi Kreatif"
            onSubmit={handleSubmit}
            onCancel={handleCancel}
        />
    );
}
CreateCreativeEconomy.layout = (page) => <Layout children={page} />;
