import { Card, Flex, notification, Table } from "antd";
import FormSelectTouristDestination from "../../common/select/tourist-destination";
import AddButton from "../../common/add-button";
import { TouristDestinationColumns } from "./colums";
import { usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import SearchBar from "../../common/search";
import { useEffect, useState } from "react";

export default function TouristDestinationContent() {
    const { touristDestinations } = usePage().props;

    const [searchValue, setSearchValue] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedVillage, setSelectedVillage] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [filteredDestinations, setFilteredDestinations] =
        useState(touristDestinations);

    const columns = TouristDestinationColumns({
        onDelete: (id) => {
            Inertia.delete(`/dashboard/tourist-destinations/${id}`, {
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

    useEffect(() => {
        const filtered = touristDestinations.filter((item) => {
            const matchSearch = item.name
                .toLowerCase()
                .includes(searchValue.toLowerCase());
            const matchDistrict = selectedDistrict
                ? item.district === selectedDistrict
                : true;
            const matchVillage = selectedVillage
                ? item.village === selectedVillage
                : true;
            const matchCategory = selectedCategory
                ? item.category?.name_category === selectedCategory
                : true;
            return (
                matchSearch && matchDistrict && matchVillage && matchCategory
            );
        });
        setFilteredDestinations(filtered);
    }, [
        searchValue,
        selectedDistrict,
        selectedVillage,
        selectedCategory,
        touristDestinations,
    ]);

    return (
        <div>
            <Card style={{ marginBottom: 16, borderRadius: 8 }}>
                <FormSelectTouristDestination
                    onFilter={({ district, village, category }) => {
                        setSelectedDistrict(district);
                        setSelectedVillage(village);
                        setSelectedCategory(category);
                    }}
                    touristDestinations={touristDestinations}
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
                            Inertia.visit(
                                "/dashboard/tourist-destinations/create"
                            )
                        }
                        title="Tambah Destinasi"
                    />
                    <SearchBar
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onSearch={(val) => setSearchValue(val)}
                    />
                </Flex>
                <Table
                    columns={columns}
                    dataSource={filteredDestinations}
                    rowKey="id"
                    pagination={{ position: ["bottomRight"] }}
                />
            </Card>
        </div>
    );
}
