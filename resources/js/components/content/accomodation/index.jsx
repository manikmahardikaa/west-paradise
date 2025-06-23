import { usePage } from "@inertiajs/inertia-react";
import { Card, Flex, notification, Table } from "antd";
import { useEffect, useState } from "react";
import AddButton from "../../common/add-button";
import SearchBar from "../../common/search";
import AccomodationColumns from "./columns";
import FormSelectAccomodation from "../../common/select/accomodation";
import { Inertia } from "@inertiajs/inertia";

export default function AccomodationContent() {
    const { accomodations = [] } = usePage().props;

    const [searchValue, setSearchValue] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedVillage, setSelectedVillage] = useState("");
    const [filteredData, setFilteredData] = useState(accomodations);

    const columns = AccomodationColumns({
        onDelete: (id) => {
            Inertia.delete(`/dashboard/accommodations/${id}`, {
                onSuccess: () => {
                    notification.success({
                        message: "Berhasil",
                        description: "Akomodasi berhasil dihapus.",
                    });
                },
                onError: (errors) => {
                    notification.error({
                        message: "Gagal",
                        description:
                            errors.name ||
                            "Terjadi kesalahan saat menghapus akomodasi.",
                    });
                },
            });
        },
    });

    useEffect(() => {
        const filtered = accomodations.filter((item) => {
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
    }, [searchValue, selectedDistrict, selectedVillage, accomodations]);

    return (
        <div>
            <Card style={{ marginBottom: 16, borderRadius: 8 }}>
                <FormSelectAccomodation
                    accomodation={accomodations}
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
                            Inertia.visit("/dashboard/accommodations/create")
                        }
                        title="Tambah Akomodasi"
                    />
                    <SearchBar
                        placeholder="Cari Akomodasi"
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
