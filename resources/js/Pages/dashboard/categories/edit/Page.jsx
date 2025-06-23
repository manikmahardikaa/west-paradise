import { usePage } from "@inertiajs/inertia-react";
import FormCategory from "../../../../components/common/form/category";
import Layout from "../../Layout";
import { Inertia } from "@inertiajs/inertia";
import { notification } from "antd";

export default function EditCategory() {
    const { category } = usePage().props;

    const handleSubmit = (values) => {
        Inertia.put(`/dashboard/categories/${category.id}`, values, {
            onSuccess: () => {
                notification.success({
                    message: "Berhasil",
                    description: "Kategori berhasil diupdate.",
                });
            },
            onError: (errors) => {
                notification.error({
                    message: "Gagal",
                    description:
                        errors.name ||
                        "Terjadi kesalahan saat update kategori.",
                });
            },
        });
    };

    const handleCancel = () => {
        Inertia.visit("/dashboard/categories");
    };

    return (
        <div>
            <FormCategory
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                process="update"
                title="Edit Kategori"
                initialValues={category}
            />
        </div>
    );
}

// Layout wrapper
EditCategory.layout = (page) => <Layout children={page} />;
