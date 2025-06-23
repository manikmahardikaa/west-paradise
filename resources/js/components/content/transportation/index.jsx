import { usePage } from "@inertiajs/inertia-react";
import { Card, Flex, notification, Table } from "antd";
import TransportationColumns from "./columns";
import { Inertia } from "@inertiajs/inertia";
import FormSelectTransportation from "../../common/select/transportation";
import AddButton from "../../common/add-button";
import SearchBar from "../../common/search";
import { useState, useEffect } from "react";

export default function TransportationContent() {
    const { transportations = [] } = usePage().props;

    const [searchValue, setSearchValue] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedVillage, setSelectedVillage] = useState("");
    const [filteredData, setFilteredData] = useState(transportations);

    const columns = TransportationColumns({
        onDelete: (id) => {
            Inertia.delete(`/dashboard/transportations/${id}`, {
                onSuccess: () => {
                    notification.success({
                        message: "Berhasil",
                        description: "Transportasi berhasil dihapus.",
                    });
                },
                onError: (errors) => {
                    notification.error({
                        message: "Gagal",
                        description:
                            errors.name ||
                            "Terjadi kesalahan saat menghapus transportasi.",
                    });
                },
            });
        },
    });

    useEffect(() => {
        const filtered = transportations.filter((item) => {
            const matchSearch = (item.name || "")
                .toLowerCase()
                .includes(searchValue.toLowerCase());

            const matchDistrict = selectedDistrict
                ? item.district === selectedDistrict
                : true;

            const matchVillage = selectedVillage
                ? item.village === selectedVillage
                : true;

            return matchSearch && matchDistrict && matchVillage;
        });

        setFilteredData(filtered);
    }, [transportations, searchValue, selectedDistrict, selectedVillage]);

    return (
        <div>
            <Card style={{ marginBottom: 16, borderRadius: 8 }}>
                <FormSelectTransportation
                    transportation={transportations}
                    onFilter={({ district, village }) => {
                        setSelectedDistrict(district);
                        setSelectedVillage(village);
                    }}
                />
            </Card>
            <Card style={{ borderRadius: 8 }}>
                <Flex
                    justify="space-between"
                    align="middle"
                    style={{ marginBottom: 16 }}
                >
                    <AddButton
                        onClick={() =>
                            Inertia.visit("/dashboard/transportations/create")
                        }
                        title="Tambah Transportasi"
                    />
                    <SearchBar
                        placeholder="Cari Transportasi"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onSearch={(val) => setSearchValue(val)}
                    />
                </Flex>
                <Table
                    columns={columns}
                    rowKey="id"
                    dataSource={filteredData}
                    pagination={{ position: ["bottomRight"] }}
                />
            </Card>
        </div>
    );
}
