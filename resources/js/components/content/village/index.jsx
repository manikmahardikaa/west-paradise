import { usePage } from "@inertiajs/inertia-react";
import { Card, Flex, notification, Table } from "antd";
import FormSelectVillage from "../../common/select/village";
import AddButton from "../../common/add-button";
import VillageColumns from "./columns";
import SearchBar from "../../common/search";
import { Inertia } from "@inertiajs/inertia";
import { useState, useEffect } from "react";

export default function VillageContent() {
    const { villages } = usePage().props;

    const [searchValue, setSearchValue] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedVillage, setSelectedVillage] = useState("");
    const [filteredVillages, setFilteredVillages] = useState(villages);

    const columns = VillageColumns({
        onDelete: (id) => {
            Inertia.delete(`/dashboard/villages/${id}`, {
                onSuccess: () => {
                    notification.success({
                        message: "Berhasil",
                        description: "Desa wisata berhasil dihapus.",
                    });
                },
                onError: (errors) => {
                    notification.error({
                        message: "Gagal",
                        description:
                            errors.name ||
                            "Terjadi kesalahan saat menghapus desa.",
                    });
                },
            });
        },
    });

    useEffect(() => {
        const filtered = villages.filter((item) => {
            const matchSearch = item.name
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
        setFilteredVillages(filtered);
    }, [searchValue, selectedDistrict, selectedVillage, villages]);

    return (
        <div>
            <Card style={{ marginBottom: 16, borderRadius: 8 }}>
                <FormSelectVillage
                    village={villages}
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
                            Inertia.visit("/dashboard/villages/create")
                        }
                        title="Tambah Desa Wisata"
                    />
                    <SearchBar
                        placeholder="Cari Desa"
                        value={searchValue}
                        onSearch={(val) => setSearchValue(val)}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                </Flex>
                <Table
                    columns={columns}
                    rowKey="id"
                    dataSource={filteredVillages}
                    pagination={{ position: ["bottomRight"] }}
                />
            </Card>
        </div>
    );
}
