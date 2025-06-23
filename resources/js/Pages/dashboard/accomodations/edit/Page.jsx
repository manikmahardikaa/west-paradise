import { usePage } from "@inertiajs/inertia-react";
import FormAccomodation from "../../../../components/common/form/accomodation";
import Layout from "../../Layout";
import { Inertia } from "@inertiajs/inertia";
import { notification } from "antd";

export default function EditAccomodation() {
    const { accomodation } = usePage().props;
    const handleSubmit = (values) => {
        Inertia.put(`/dashboard/accommodations/${accomodation.id}`, values, {
            onSuccess: () => {
                notification.success({
                    message: "Berhasil",
                    description: "Akomodasi berhasil diupdate.",
                });
            },
            onError: (errors) => {
                notification.error({
                    message: "Gagal",
                    description:
                        errors.name ||
                        "Terjadi kesalahan saat update akomodasi.",
                });
            },
        });
    };
    const handleCancel = () => {
        Inertia.visit("/dashboard/accommodations");
    };
    return (
        <FormAccomodation
            process="update"
            title="Edit Akomodasi"
            initialValues={accomodation}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
        />
    );
}

EditAccomodation.layout = (page) => <Layout children={page} />;
