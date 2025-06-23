import { usePage } from "@inertiajs/inertia-react";
import CreativeEconomyColumns from "./columns";
import { Inertia } from "@inertiajs/inertia";
import AddButton from "../../common/add-button";
import { Card, Flex, notification, Table } from "antd";
import FormSelectCreativeEconomy from "../../common/select/creative-economy";
import SearchBar from "../../common/search";
import { useState, useEffect } from "react";

export default function CreativeEconomyContent() {
    const { creativeEconomy = [] } = usePage().props;

    const [searchValue, setSearchValue] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedVillage, setSelectedVillage] = useState("");
    const [filteredData, setFilteredData] = useState(creativeEconomy);

    const columns = CreativeEconomyColumns({
        onDelete: (id) => {
            Inertia.delete(`/dashboard/creative-economy/${id}`, {
                onSuccess: () => {
                    notification.success({
                        message: "Berhasil",
                        description: "Ekonomi Kreatif berhasil dihapus.",
                    });
                },
                onError: (errors) => {
                    notification.error({
                        message: "Gagal",
                        description:
                            errors.name ||
                            "Terjadi kesalahan saat menghapus ekonomi kreatif.",
                    });
                },
            });
        },
    });

    useEffect(() => {
        const filtered = creativeEconomy.filter((item) => {
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
    }, [creativeEconomy, searchValue, selectedDistrict, selectedVillage]);

    return (
        <div>
            <Card style={{ marginBottom: 16, borderRadius: 8 }}>
                <FormSelectCreativeEconomy
                    onFilter={({ district, village }) => {
                        setSelectedDistrict(district);
                        setSelectedVillage(village);
                    }}
                    creativeEconomy={creativeEconomy}
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
                            Inertia.visit("/dashboard/creative-economy/create")
                        }
                        title="Tambah Ekonomi Kreatif"
                    />
                    <SearchBar
                        placeholder="Cari Ekonomi Kreatif"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onSearch={(val) => setSearchValue(val)}
                    />
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
