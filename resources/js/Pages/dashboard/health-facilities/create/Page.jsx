import { Inertia } from "@inertiajs/inertia";
import FormHealtFacility from "../../../../components/common/form/healt-facility";
import Layout from "../../Layout";
import { notification } from "antd";

export default function CreateHealthFacility() {
    const handleSubmit = (values) => {
        Inertia.post("/dashboard/health-facilities", values, {
            onSuccess: () => {
                notification.success({
                    message: "Berhasil",
                    description: "Fasilitas Kesehatan berhasil ditambahkan.",
                });
            },
            onError: (errors) => {
                notification.error({
                    message: "Gagal",
                    description:
                        errors.name ||
                        "Terjadi kesalahan saat menambahkan fasilitas kesehatan.",
                });
            },
        });
    };

    const handleCancel = () => {
        Inertia.visit("/dashboard/health-facilities");
    };

    return (
        <FormHealtFacility
            process="create"
            title="Tambah Fasilitas Kesehatan"
            onSubmit={handleSubmit}
            onCancel={handleCancel}
        />
    );
}

CreateHealthFacility.layout = (page) => <Layout children={page} />;
