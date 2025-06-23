import { usePage } from "@inertiajs/inertia-react";
import { Card, Flex, notification, Table } from "antd";
import AddButton from "../../common/add-button";
import SearchBar from "../../common/search";
import SliderColumns from "./columns";
import { Inertia } from "@inertiajs/inertia";

export default function SliderContent() {
    const { sliders } = usePage().props;
    const columns = SliderColumns({
        onDelete: (id) => {
            Inertia.delete(`/dashboard/sliders/${id}`, {
                onSuccess: () => {
                    notification.success({
                        message: "Berhasil",
                        description: "Destinasi wisata berhasil dihapus.",
                    });
                },
                onError: (errors) => {
                    notification.error({
                        message: "Gagal",
                        description:
                            errors.name ||
                            "Terjadi kesalahan saat menghapus destinasi wisata.",
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
                            Inertia.visit("/dashboard/sliders/create")
                        }
                        title="Tambah Slider"
                    />
                    <SearchBar
                        // value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onSearch={() => {}}
                    />
                </Flex>
                <Table
                    columns={columns}
                    dataSource={sliders}
                    rowKey="id"
                    pagination={{ position: ["bottomRight"] }}
                />
            </Card>
        </div>
    );
}
