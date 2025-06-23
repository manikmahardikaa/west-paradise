import { usePage } from "@inertiajs/inertia-react";
import FormTouristDestination from "../../../../components/common/form/tourist-destination";
import Layout from "../../Layout";
import { Inertia } from "@inertiajs/inertia";
import { notification } from "antd";
export default function EditTouristDestination() {
    const { touristDestination } = usePage().props;

    const handleSubmit = (values) => {
        Inertia.put(
            `/dashboard/tourist-destinations/${touristDestination.id}`,
            values,
            {
                onSuccess: () => {
                    notification.success({
                        message: "Berhasil",
                        description: "Destinasi Wisata berhasil ditambahkan.",
                    });
                    Inertia.visit("/dashboard/tourist-destinations");
                },
                onError: (errors) => {
                    notification.error({
                        message: "Gagal",
                        description:
                            errors.name ||
                            "Terjadi kesalahan saat menambahkan destinasi wisata.",
                    });
                },
            }
        );
    };

    const handleCancel = () => {
        Inertia.visit("/dashboard/tourist-destinations");
    };

    return (
        <FormTouristDestination
            title={"Edit Destinasi Wisata"}
            initialValues={touristDestination}
            process="update"
            onSubmit={handleSubmit}
            onCancel={handleCancel}
        />
    );
}

EditTouristDestination.layout = (page) => <Layout children={page} />;
