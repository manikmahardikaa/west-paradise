import { Inertia } from "@inertiajs/inertia";
import ActionTable from "../../common/action-table";

export const CategoryColumns = ({ onDelete }) => {
    const columns = [
        {
            title: "No",
            key: "index",
            render: (text, record, index) => index + 1,
        },
        {
            title: "Nama",
            dataIndex: "name_category",
            key: "name_category",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
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
                        {text === 1 ? "Aktif" : "Draft"}
                    </span>
                );
            },
        },
        {
            title: "Actions",
            key: "actions",
            render: (text, record) => (
                <ActionTable
                    title="Kategori"
                    description={record.name_category}
                    actions="delete"
                    id={record.id}
                    onEdit={() => {
                        Inertia.get(`/dashboard/categories/${record.id}/edit`);
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
