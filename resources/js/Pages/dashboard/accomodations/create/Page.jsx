import { Inertia } from "@inertiajs/inertia";
import FormAccomodation from "../../../../components/common/form/accomodation";
import Layout from "../../Layout";
import { notification } from "antd";

export default function CreateAccomodation() {
    const handleSubmit = (values) => {
        Inertia.post("/dashboard/accommodations", values, {
            onSuccess: () => {
                notification.success({
                    message: "Berhasil",
                    description: "Akomodasi berhasil ditambahkan.",
                });
            },
            onError: (errors) => {
                notification.error({
                    message: "Gagal",
                    description:
                        errors.name ||
                        "Terjadi kesalahan saat menambahkan akomodasi.",
                });
            },
        });
    };

    const handleCancel = () => {
        Inertia.visit("/dashboard/accommodations");
    };
    return (
        <FormAccomodation
            title="Tambah Akomodasi"
            process="create"
            onSubmit={handleSubmit}
            onCancel={handleCancel}
        />
    );
}

CreateAccomodation.layout = (page) => <Layout children={page} />;
