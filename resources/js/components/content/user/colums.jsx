import { Inertia } from "@inertiajs/inertia";
import ActionTable from "../../common/action-table";

export const UserColumns = ({ onDelete }) => {
    const columns = [
        {
            title: "No",
            key: "index",
            render: (text, record, index) => index + 1,
        },
        {
            title: "Username",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Status",
            dataIndex: "is_active",
            key: "is_active",
            render: (text) => {
                return (
                    <span
                        style={{
                            backgroundColor: text === 1 ? "#28C76F" : "#1E1E1E",
                            color: "#fff",
                            padding: "4px 12px",
                            borderRadius: "20px",
                            fontSize: "12px",
                            display: "inline-block",
                            fontWeight: 500,
                        }}
                    >
                        {text === 1 ? "Active" : "Inactive"}
                    </span>
                );
            },
        },
        {
            title: "Actions",
            key: "actions",
            render: (text, record) => (
                <ActionTable
                    title="Akun"
                    description={record.name}
                    actions="delete"
                    id={record.id}
                    onEdit={() => {
                        Inertia.get(`/dashboard/accounts/${record.id}/edit`);
                    }}
                    onDelete={() => {
                        onDelete(record.id);
                    }}
                />
            ),
        },
    ];
    return columns;
};
