import { usePage } from "@inertiajs/inertia-react";
import HealthFacilityColumns from "./colums";
import { Inertia } from "@inertiajs/inertia";
import { Card, Flex, notification, Table } from "antd";
import FormSelectHealtFacility from "../../common/select/healt-facility";
import AddButton from "../../common/add-button";
import SearchBar from "../../common/search";
import { useState, useEffect } from "react";

export default function HealthFacilitiesContent() {
    const { healthFacilities } = usePage().props;

    const [searchValue, setSearchValue] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedVillage, setSelectedVillage] = useState("");
    const [filteredFacilities, setFilteredFacilities] =
        useState(healthFacilities);

    const columns = HealthFacilityColumns({
        onDelete: (id) => {
            Inertia.delete(`/dashboard/health-facilities/${id}`, {
                onSuccess: () => {
                    notification.success({
                        message: "Berhasil",
                        description: "Fasilitas kesehatan berhasil dihapus.",
                    });
                },
                onError: (errors) => {
                    notification.error({
                        message: "Gagal",
                        description:
                            errors.name ||
                            "Terjadi kesalahan saat menghapus fasilitas kesehatan.",
                    });
                },
            });
        },
    });

    useEffect(() => {
        const filtered = healthFacilities.filter((item) => {
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

        setFilteredFacilities(filtered);
    }, [searchValue, selectedDistrict, selectedVillage, healthFacilities]);

    return (
        <div>
            <Card style={{ marginBottom: 16, borderRadius: 8 }}>
                <FormSelectHealtFacility
                    healtFacility={healthFacilities}
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
                            Inertia.visit("/dashboard/health-facilities/create")
                        }
                        title="Tambah Fasilitas Kesehatan"
                    />
                    <SearchBar
                        placeholder="Cari Fasilitas"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onSearch={(val) => setSearchValue(val)}
                    />
                </Flex>
                <Table
                    columns={columns}
                    dataSource={filteredFacilities}
                    rowKey="id"
                    pagination={{ position: ["bottomRight"] }}
                />
            </Card>
        </div>
    );
}
