import { Inertia } from "@inertiajs/inertia";
import FormUser from "../../../../components/common/form/user";
import Layout from "../../Layout";
import { notification } from "antd";

export default function CreateUser() {
    const handleSubmit = (values) => {
        Inertia.post("/dashboard/accounts", values, {
            onSuccess: () => {
                notification.success({
                    message: "Berhasil",
                    description: "User berhasil ditambahkan.",
                });
            },
            onError: (errors) => {
                notification.error({
                    message: "Gagal",
                    description:
                        errors.name ||
                        "Terjadi kesalahan saat menambahkan user.",
                });
            },
        });
    };

    const handleCancel = () => {
        Inertia.visit("/dashboard/accounts");
    };
    return (
        <div>
            <FormUser
                onSubmit={handleSubmit}
                title="Tambah User"
                onCancel={handleCancel}
                process="create"
            />
        </div>
    );
}

CreateUser.layout = (page) => <Layout children={page} />;
