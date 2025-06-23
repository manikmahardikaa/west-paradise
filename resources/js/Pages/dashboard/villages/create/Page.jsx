import { Inertia } from "@inertiajs/inertia";
import FormVillage from "../../../../components/common/form/village";
import Layout from "../../Layout";
import { notification } from "antd";

export default function CreateVillage() {
    const handleSubmit = (values) => {
        Inertia.post("/dashboard/villages", values, {
            onSuccess: () => {
                notification.success({
                    message: "Berhasil",
                    description: "Destinasi Wisata berhasil ditambahkan.",
                });
                Inertia.visit("/dashboard/villages");
            },
            onError: (errors) => {
                notification.error({
                    message: "Gagal",
                    description:
                        errors.name ||
                        "Terjadi kesalahan saat menambahkan destinasi wisata.",
                });
            },
        });
    };

    const handleCancel = () => {
        Inertia.visit("/dashboard/villages");
    };

    return (
        <FormVillage
            title="Tambah Destinasi Desa"
            process="create"
            onSubmit={handleSubmit}
            onCancel={handleCancel}
        />
    );
}

CreateVillage.layout = (page) => <Layout children={page} />;
