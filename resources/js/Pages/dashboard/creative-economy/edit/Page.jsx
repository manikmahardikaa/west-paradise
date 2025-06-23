import { usePage } from "@inertiajs/inertia-react";
import FormCreativeEconomy from "../../../../components/common/form/creative-economy";
import Layout from "../../Layout";
import { Inertia } from "@inertiajs/inertia";
import { notification } from "antd";

export default function EditCreativeEconomy() {
    const { creativeEconomy } = usePage().props;

    const handleSubmit = (values) => {
        Inertia.put(
            `/dashboard/creative-economy/${creativeEconomy.id}`,
            values,
            {
                onSuccess: () => {
                    notification.success({
                        message: "Berhasil",
                        description: "Ekonomi Kreatif berhasil diupdate.",
                    });
                },
                onError: (errors) => {
                    notification.error({
                        message: "Gagal",
                        description:
                            errors.name ||
                            "Terjadi kesalahan saat update ekonomi kreatif.",
                    });
                },
            }
        );
    };
    const handleCancel = () => {
        Inertia.visit("/dashboard/creative-economy");
    };
    return (
        <FormCreativeEconomy
            initialValues={creativeEconomy}
            process="update"
            title="Edit Creative Economy"
            onSubmit={handleSubmit}
            onCancel={handleCancel}
        />
    );
}

EditCreativeEconomy.layout = (page) => <Layout children={page} />;
