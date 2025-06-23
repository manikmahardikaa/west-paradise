import { usePage } from "@inertiajs/inertia-react";
import { Card, Flex, notification, Table } from "antd";
import SearchBar from "../../common/search";
import AddButton from "../../common/add-button";
import EventColumns from "./columns";
import { Inertia } from "@inertiajs/inertia";

export default function EventContent() {
    const { events } = usePage().props;
    const columns = EventColumns({
        onDelete: (id) => {
            Inertia.delete(`/dashboard/events/${id}`, {
                onSuccess: () => {
                    notification.success({
                        message: "Berhasil",
                        description: "Acara berhasil dihapus.",
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
                        onClick={() =>
                            Inertia.visit("/dashboard/events/create")
                        }
                        title="Tambah Acara"
                    />
                    <SearchBar
                        // value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onSearch={() => {}}
                    />
                </Flex>
                <Table
                    columns={columns}
                    dataSource={events}
                    rowKey="id"
                    pagination={{ position: ["bottomRight"] }}
                />
            </Card>
        </div>
    );
}
