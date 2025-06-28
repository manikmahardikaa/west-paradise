import { usePage } from "@inertiajs/inertia-react";
import { Card, Flex, notification, Table } from "antd";
import FormReviewSelect from "../../common/select/review";
import SearchBar from "../../common/search";
import { ReviewColumns } from "./colums";
import { Inertia } from "@inertiajs/inertia";
import { useState, useEffect } from "react";

export default function ReviewContentDashboard() {
    const { review = [] } = usePage().props;
    const [filteredData, setFilteredData] = useState(review);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterSector, setFilterSector] = useState(null);

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

    // 🔍 Filtering logic
    const applyFilter = () => {
        let result = [...review];

        if (filterSector) {
            result = result.filter((item) => item.review_type === filterSector);
        }

        if (searchTerm) {
            result = result.filter(
                (item) =>
                    item.name
                        ?.toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    item.content
                        ?.toLowerCase()
                        .includes(searchTerm.toLowerCase())
            );
        }

        setFilteredData(result);
    };

    useEffect(() => {
        applyFilter();
    }, [filterSector, searchTerm, review]);

    const handleFilter = ({ sector }) => {
        setFilterSector(sector || null);
    };

    const handleSearch = (value) => {
        setSearchTerm(value || "");
    };

    return (
        <div>
            <Card style={{ marginBottom: 16, borderRadius: 8 }}>
                <FormReviewSelect review={review} onFilter={handleFilter} />
            </Card>
            <Card style={{ borderRadius: 8 }}>
                <Flex justify="end" align="middle" style={{ marginBottom: 16 }}>
                    <SearchBar onSearch={handleSearch} />
                </Flex>
                <Table
                    columns={columns}
                    dataSource={filteredData}
                    rowKey="id"
                    pagination={{ position: ["bottomRight"] }}
                />
            </Card>
        </div>
    );
}
