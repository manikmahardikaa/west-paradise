import { Inertia } from "@inertiajs/inertia";
import FormTranportasi from "../../../../components/common/form/transportation";
import { notification } from "antd";
import Layout from "../../Layout";

export default function CreateTransportation() {
    const handleSubmit = (values) => {
        Inertia.post("/dashboard/transportations", values, {
            onSuccess: () => {
                notification.success({
                    message: "Berhasil",
                    description: "Transportasi berhasil ditambahkan.",
                });
                Inertia.visit("/dashboard/transportations");
            },
            onError: (errors) => {
                notification.error({
                    message: "Gagal",
                    description:
                        errors.name ||
                        "Terjadi kesalahan saat menambahkan transportasi.",
                });
            },
        });
    };
    const handleCancel = () => {
        Inertia.visit("/dashboard/transportations");
    };
    return (
        <div>
            <FormTranportasi
                onSubmit={handleSubmit}
                title="Tambah Transportasi"
                onCancel={handleCancel}
                process="create"
            />
        </div>
    );
}
CreateTransportation.layout = (page) => <Layout children={page} />;
