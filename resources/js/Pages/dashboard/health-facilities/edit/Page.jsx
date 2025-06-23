import { usePage } from "@inertiajs/inertia-react";
import FormHealtFacility from "../../../../components/common/form/healt-facility";
import { Inertia } from "@inertiajs/inertia";
import { notification } from "antd";
import Layout from "../../Layout";

export default function EditHealthFacility() {
    const { healthFacility } = usePage().props;
    console.log(healthFacility);
    const handleSubmit = (values) => {
        Inertia.put(
            `/dashboard/health-facilities/${healthFacility.id}`,
            values,
            {
                onSuccess: () => {
                    notification.success({
                        message: "Berhasil",
                        description: "Fasilitas Kesehatan berhasil diupdate.",
                    });
                },
                onError: (errors) => {
                    notification.error({
                        message: "Gagal",
                        description:
                            errors.name ||
                            "Terjadi kesalahan saat update fasilitas kesehatan.",
                    });
                },
            }
        );
    };

    const handleCancel = () => {
        Inertia.visit("/dashboard/health-facilities");
    };

    return (
        <FormHealtFacility
            process="update"
            title="Edit Fasilitas Kesehatan"
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            initialValues={healthFacility}
        />
    );
}

EditHealthFacility.layout = (page) => <Layout children={page} />;
