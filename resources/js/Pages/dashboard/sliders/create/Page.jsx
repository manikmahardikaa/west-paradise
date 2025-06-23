import { Inertia } from "@inertiajs/inertia";
import FormSlider from "../../../../components/common/form/slider";
import { notification } from "antd";
import Layout from "../../Layout";

export default function CreateSlider() {
    const handleSubmit = (values) => {
        Inertia.post("/dashboard/sliders", values, {
            onSuccess: () => {
                notification.success({
                    message: "Berhasil",
                    description: "Slider berhasil ditambahkan.",
                });
            },
            onError: (errors) => {
                notification.error({
                    message: "Gagal",
                    description:
                        errors.title ||
                        "Terjadi kesalahan saat menambahkan slider.",
                });
            },
        });
    };

    const handleCancel = () => {
        Inertia.visit("/dashboard/sliders");
    };
    return (
        <FormSlider
            title="Tambah Slider"
            process="create"
            onSubmit={handleSubmit}
            onCancel={handleCancel}
        />
    );
}

CreateSlider.layout = (page) => <Layout children={page} />;
