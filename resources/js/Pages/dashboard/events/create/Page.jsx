import { Inertia } from "@inertiajs/inertia";
import FormEvent from "../../../../components/common/form/event";
import { notification } from "antd";
import Layout from "../../Layout";

export default function CreateEvent() {
    const handleSubmit = (values) => {
        Inertia.post("/dashboard/events", values, {
            onSuccess: () => {
                notification.success({
                    message: "Berhasil",
                    description: "Event berhasil ditambahkan.",
                });
            },
            onError: (errors) => {
                notification.error({
                    message: "Gagal",
                    description:
                        errors.name ||
                        "Terjadi kesalahan saat menambahkan event.",
                });
            },
        });
    };

    const handleCancel = () => {
        Inertia.visit("/dashboard/events");
    };
    return (
        <FormEvent
            process="create"
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            title="Tambah Event"
        />
    );
}

CreateEvent.layout = (page) => <Layout children={page} />;
