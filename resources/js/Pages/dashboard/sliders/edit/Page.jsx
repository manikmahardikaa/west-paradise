import { Inertia } from "@inertiajs/inertia";
import FormSlider from "../../../../components/common/form/slider";
import Layout from "../../Layout";
import { notification } from "antd";
import { usePage } from "@inertiajs/inertia-react";

export default function EditSlider() {
    const { slider } = usePage().props;
    const handleSubmit = (values) => {
        Inertia.put(`/dashboard/sliders/${slider.id}`, values, {
            onSuccess: () => {
                notification.success({
                    message: "Berhasil",
                    description: "Slider berhasil diperbarui.",
                });
            },
            onError: (errors) => {
                notification.error({
                    message: "Gagal",
                    description:
                        errors.title ||
                        "Terjadi kesalahan saat memperbarui slider.",
                });
            },
        });
    };

    const handleCancel = () => {
        Inertia.visit("/dashboard/sliders");
    };
    return (
        <FormSlider
            title="Edit Slider"
            process="update"
            initialValues={slider}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
        />
    );
}
// Layout wrapper
EditSlider.layout = (page) => <Layout children={page} />;
