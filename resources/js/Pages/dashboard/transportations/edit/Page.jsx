import { usePage } from "@inertiajs/inertia-react";
import FormTranportasi from "../../../../components/common/form/transportation";
import Layout from "../../Layout";
import { Inertia } from "@inertiajs/inertia";
import { notification } from "antd";

export default function EditTransportation() {
    const { transportation } = usePage().props;


    const handleSubmit = (values) => {
        Inertia.put(
            `/dashboard/transportations/${transportation.id}`,
            values,
            {
                onSuccess: () => {
                    notification.success({
                        message: "Berhasil",
                        description: "Transportasi berhasil diupdate.",
                    });
                },
                onError: (errors) => {
                    notification.error({
                        message: "Gagal",
                        description:
                            errors.name ||
                            "Terjadi kesalahan saat update transportasi.",
                    });
                },
            }
        );
    };

    const handleCancel = () => {
        Inertia.visit("/dashboard/transportations");
    };
    return (
        <FormTranportasi
            process="update"
            title="Edit Transportasi"
            initialValues={transportation}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
        />
    );
}

EditTransportation.layout = (page) => <Layout children={page} />;
