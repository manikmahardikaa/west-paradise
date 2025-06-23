import FormCategory from "../../../../components/common/form/category";
import Layout from "../../Layout";
import { Inertia } from "@inertiajs/inertia";
import { notification } from "antd";

export default function CreateCategory() {
    const handleSubmit = (values) => {
        Inertia.post("/dashboard/categories", values, {
            onSuccess: () => {
                notification.success({
                    message: "Berhasil",
                    description: "Kategori berhasil ditambahkan.",
                });
            },
            onError: (errors) => {
                notification.error({
                    message: "Gagal",
                    description:
                        errors.name ||
                        "Terjadi kesalahan saat menambahkan kategori.",
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
                title="Tambah Kategori"
                onCancel={handleCancel}
                process="create"
            />
        </div>
    );
}

// Layout wrapper
CreateCategory.layout = (page) => <Layout children={page} />;
