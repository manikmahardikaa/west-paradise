import { Inertia } from "@inertiajs/inertia";
import Layout from "../../Layout";
import { notification } from "antd";
import FormRestaurant from "../../../../components/common/form/restaurant";

export default function CreateRestaurant() {
    const handleSubmit = (values) => {
        Inertia.post("/dashboard/restaurants", values, {
            onSuccess: () => {
                notification.success({
                    message: "Berhasil",
                    description: "Restoran berhasil ditambahkan.",
                });
                Inertia.visit("/dashboard/restaurants");
            },
            onError: (errors) => {
                notification.error({
                    message: "Gagal",
                    description:
                        errors.name ||
                        "Terjadi kesalahan saat menambahkan restoran.",
                });
            },
        });
    };

    const handleCancel = () => {
        Inertia.visit("/dashboard/restaurants");
    };
    return (
        <div>
            <FormRestaurant
                onSubmit={handleSubmit}
                title="Tambah Restoran"
                onCancel={handleCancel}
                process="create"
            />
        </div>
    );
}

CreateRestaurant.layout = (page) => <Layout children={page} />;
