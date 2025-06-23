import { Inertia } from "@inertiajs/inertia";
import ActionTable from "../../common/action-table";
import { Rate } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/id";
import { parseReviewType } from "../../../utils/parseReviewType";

export const ReviewColumns = ({ onDelete }) => {
    const columns = [
        {
            title: "No",
            key: "index",
            render: (text, record, index) => index + 1,
        },
        {
            title: "Tanggal",
            dataIndex: "created_at",
            key: "created_at",
            render: (text, record) => {
                return dayjs(record.created_at)
                    .locale("id")
                    .format("D MMMM YYYY");
            },
        },
        {
            title: "Nama Destinasi",
            dataIndex: "review_type",
            key: "review_type",
            render: (text, record) => {
                return parseReviewType(record.review_type);
            },
        },
        {
            title: "Pengguna",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Peringkat",
            dataIndex: "rating",
            key: "rating",
            render: (text, record) => {
                return <Rate disabled value={record.rating} />;
            },
        },
        {
            title: "Ulasan",
            dataIndex: "review",
            key: "review",
        },
        {
            title: "Actions",
            key: "actions",
            render: (text, record) => (
                <ActionTable
                    title="Review"
                    description={record.name}
                    actions="delete"
                    id={record.id}
                    model="reviews"
                    process="images"
                    onEdit={() => {
                        Inertia.get(
                            `/dashboard/tourist-destinations/${record.id}/edit`
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
};
