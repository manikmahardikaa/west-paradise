import { Inertia } from "@inertiajs/inertia";
import FormEvent from "../../../../components/common/form/event";
import { notification } from "antd";
import { usePage } from "@inertiajs/inertia-react";
import Layout from "../../Layout";

export default function EditEvent() {
    const { event } = usePage().props;
    const handleSubmit = (values) => {
        Inertia.put(`/dashboard/events/${event.id}`, values, {
            onSuccess: () => {
                notification.success({
                    message: "Berhasil",
                    description: "Event berhasil diupdate.",
                });
            },
            onError: (errors) => {
                notification.error({
                    message: "Gagal",
                    description:
                        errors.name || "Terjadi kesalahan saat update event.",
                });
            },
        });
    };
    const handleCancel = () => {
        Inertia.visit("/dashboard/events");
    };
    return (
        <FormEvent
            process="update"
            title="Edit Event"
            initialValues={event}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
        />
    );
}

EditEvent.layout = (page) => <Layout children={page} />;
