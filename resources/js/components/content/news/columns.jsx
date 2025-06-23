import { Inertia } from "@inertiajs/inertia";
import ActionTable from "../../common/action-table";

export default function NewsColumns({ onDelete }) {
    const columns = [
        {
            title: "No",
            key: "index",
            render: (text, record, index) => index + 1,
        },
        {
            title: "Judul Berita",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Status",
            dataIndex: "is_published",
            key: "is_published",
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
                        {text === 1 ? "Publish" : "Draft"}
                    </span>
                );
            },
        },
        {
            title: "Actions",
            key: "actions",
            render: (text, record) => (
                <ActionTable
                    title="Berita"
                    description={record.name}
                    actions="delete"
                    id={record.id}
                    process="images"
                    onEdit={() => {
                        Inertia.get(`/dashboard/news/${record.id}/edit`);
                    }}
                    onDelete={() => {
                        onDelete(record.id);
                    }}
                />
            ),
        },
    ];
    return columns;
}
