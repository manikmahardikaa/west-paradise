import { usePage } from "@inertiajs/inertia-react";
import FormRestaurant from "../../../../components/common/form/restaurant";
import Layout from "../../Layout";
import { Inertia } from "@inertiajs/inertia";
import { notification } from "antd";

export default function EditRestaurant() {
    const { restaurant } = usePage().props;

    const handleSubmit = (values) => {
        Inertia.put(`/dashboard/restaurants/${restaurant.id}`, values, {
            onSuccess: () => {
                notification.success({
                    message: "Berhasil",
                    description: "Restoran berhasil diupdate.",
                });
            },
            onError: (errors) => {
                notification.error({
                    message: "Gagal",
                    description:
                        errors.name ||
                        "Terjadi kesalahan saat update restoran.",
                });
            },
        });
    };
    const handleCancel = () => {
        Inertia.visit("/dashboard/restaurants");
    };
    return (
        <FormRestaurant
            initialValues={restaurant}
            title="Edit Restaurant"
            process="update"
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            s
        />
    );
}

EditRestaurant.layout = (page) => <Layout children={page} />;
