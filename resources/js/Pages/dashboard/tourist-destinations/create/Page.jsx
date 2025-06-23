import FormTouristDestination from "../../../../components/common/form/tourist-destination";
import Layout from "../../Layout";
import { Inertia } from "@inertiajs/inertia";
import { notification } from "antd";

export default function CreateTouristDestination() {
    const handleSubmit = (values) => {
        Inertia.post("/dashboard/tourist-destinations", values, {
            onSuccess: () => {
                notification.success({
                    message: "Berhasil",
                    description: "Destinasi Wisata berhasil ditambahkan.",
                });
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
        Inertia.visit("/dashboard/tourist-destinations");
    };

    return (
        <div>
            <FormTouristDestination
                onSubmit={handleSubmit}
                title="Tambah Destinasi Wisata"
                onCancel={handleCancel}
                process="create"
            />
        </div>
    );
}

CreateTouristDestination.layout = (page) => <Layout children={page} />;
