import { Card, Flex, notification, Table } from "antd";
import AddButton from "../../common/add-button";
import SearchBar from "../../common/search";
import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/inertia-react";
import NewsColumns from "./columns";

export default function NewsContent() {
    const { news } = usePage().props;
    const columns = NewsColumns({
        onDelete: (id) => {
            Inertia.delete(`/dashboard/news/${id}`, {
                onSuccess: () => {
                    notification.success({
                        message: "Berhasil",
                        description: "Berita berhasil dihapus.",
                    });
                },
                onError: (errors) => {
                    notification.error({
                        message: "Gagal",
                        description:
                            errors.name ||
                            "Terjadi kesalahan saat menghapus berita.",
                    });
                },
            });
        },
    });
    return (
        <div>
            <Card style={{ borderRadius: 8 }}>
                <Flex
                    justify="space-between"
                    align="middle"
                    style={{ marginBottom: 16 }}
                >
                    <AddButton
                        onClick={() => Inertia.visit("/dashboard/news/create")}
                        title="Tambah Berita"
                    />
                    <SearchBar
                        // value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onSearch={() => {}}
                    />
                </Flex>
                <Table
                    columns={columns}
                    dataSource={news}
                    rowKey="id"
                    pagination={{ position: ["bottomRight"] }}
                />
            </Card>
        </div>
    );
}
