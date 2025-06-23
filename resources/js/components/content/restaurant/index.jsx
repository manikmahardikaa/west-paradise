import { Card, Flex, notification, Table } from "antd";
import FormSelectRestaurant from "../../common/select/restaurant";
import { usePage } from "@inertiajs/inertia-react";
import AddButton from "../../common/add-button";
import SearchBar from "../../common/search";
import RestaurantColumns from "./colums";
import { Inertia } from "@inertiajs/inertia";
import { useEffect, useState } from "react";

export default function RestaurantContent() {
    const { restaurants } = usePage().props;

    const [searchValue, setSearchValue] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedVillage, setSelectedVillage] = useState("");
    const [filteredData, setFilteredData] = useState(restaurants);

    const columns = RestaurantColumns({
        onDelete: (id) => {
            Inertia.delete(`/dashboard/restaurants/${id}`, {
                onSuccess: () => {
                    notification.success({
                        message: "Berhasil",
                        description: "Restoran berhasil dihapus.",
                    });
                },
                onError: (errors) => {
                    notification.error({
                        message: "Gagal",
                        description:
                            errors.name ||
                            "Terjadi kesalahan saat menghapus restoran.",
                    });
                },
            });
        },
    });

    useEffect(() => {
        const filtered = restaurants.filter((item) => {
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

        setFilteredData(filtered);
    }, [restaurants, searchValue, selectedDistrict, selectedVillage]);

    return (
        <div>
            <Card style={{ marginBottom: 16, borderRadius: 8 }}>
                <FormSelectRestaurant
                    onFilter={({ district, village }) => {
                        setSelectedDistrict(district);
                        setSelectedVillage(village);
                    }}
                    restaurant={restaurants}
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
                            Inertia.visit("/dashboard/restaurants/create")
                        }
                        title="Tambah Restoran"
                    />
                    <SearchBar
                        placeholder="Cari Restoran"
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
