import { Inertia } from "@inertiajs/inertia";
import ActionTable from "../../common/action-table";

export default function CreativeEconomyColumns({ onDelete }) {
    const columns = [
        {
            title: "No",
            key: "index",
            render: (text, record, index) => index + 1,
        },
        {
            title: "Nama Restoran",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Kecamatan",
            dataIndex: "district",
            key: "district",
        },
        {
            title: "Desa/Kelurahan",
            dataIndex: "village",
            key: "village",
        },
        {
            title: "Alamat",
            dataIndex: "address",
            key: "address",
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
                    title="Ekonomi Kreatif"
                    description={record.name}
                    actions="delete"
                    id={record.id}
                    process="images"
                    onEdit={() => {
                        Inertia.get(
                            `/dashboard/creative-economy/${record.id}/edit`
                        );
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
