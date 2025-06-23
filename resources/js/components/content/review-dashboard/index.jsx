import { usePage } from "@inertiajs/inertia-react";
import { Card, Flex, notification, Table } from "antd";
import FormReviewSelect from "../../common/select/review";
import SearchBar from "../../common/search";
import { ReviewColumns } from "./colums";
import { Inertia } from "@inertiajs/inertia";

export default function ReviewContentDashboard() {
    const { review = [] } = usePage().props;
    console.log(review);

    const columns = ReviewColumns({
        onDelete: (id) => {
            Inertia.delete(`/dashboard/reviews/${id}`, {
                onSuccess: () => {
                    notification.success({
                        message: "Berhasil",
                        description: "Review berhasil dihapus.",
                    });
                },
                onError: (errors) => {
                    notification.error({
                        message: "Gagal",
                        description:
                            errors.name ||
                            "Terjadi kesalahan saat menghapus review.",
                    });
                },
            });
        },
    });

    return (
        <div>
            <Card style={{ marginBottom: 16, borderRadius: 8 }}>
                <FormReviewSelect review={review} />
            </Card>
            <Card style={{ borderRadius: 8 }}>
                <Flex justify="end" align="middle" style={{ marginBottom: 16 }}>
                    <SearchBar />
                </Flex>
                <Table
                    columns={columns}
                    dataSource={review}
                    rowKey="id"
                    pagination={{ position: ["bottomRight"] }}
                />
            </Card>
        </div>
    );
}
