import { Inertia } from "@inertiajs/inertia";
import FormUser from "../../../../components/common/form/user";
import Layout from "../../Layout";
import { notification } from "antd";
import { usePage } from "@inertiajs/inertia-react";

export default function EditUser() {
    const { user } = usePage().props;
    console.log(user);
    const handleSubmit = (values) => {
        Inertia.put(`/dashboard/accounts/${user.id}`, values, {
            onSuccess: () => {
                notification.success({
                    message: "Berhasil",
                    description: "User berhasil diupdate.",
                });
            },
            onError: (errors) => {
                notification.error({
                    message: "Gagal",
                    description:
                        errors.name || "Terjadi kesalahan saat update user.",
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
                title="Edit User"
                initialValues={user}
                onCancel={handleCancel}
                process="update"
            />
        </div>
    );
}

EditUser.layout = (page) => <Layout children={page} />;
