import { usePage } from "@inertiajs/inertia-react";
import FormVillage from "../../../../components/common/form/village";
import Layout from "../../Layout";
import { Inertia } from "@inertiajs/inertia";
import { notification } from "antd";

export default function EditVillage() {
    const { village } = usePage().props;

    const handleSubmit = (values) => {
        Inertia.put(`/dashboard/villages/${village.id}`, values, {
            onSuccess: () => {
                notification.success({
                    message: "Berhasil",
                    description: "Destinasi Desa berhasil diupdate.",
                });
            },
            onError: (errors) => {
                notification.error({
                    message: "Gagal",
                    description:
                        errors.name || "Terjadi kesalahan saat update desa.",
                });
            },
        });
    };
    const handleCancel = () => {
        Inertia.visit("/dashboard/villages");
    };
    return (
        <div>
            <FormVillage
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                process="update"
                title="Edit Destinasi Desa"
                initialValues={village}
            />
        </div>
    );
}

EditVillage.layout = (page) => <Layout children={page} />;
