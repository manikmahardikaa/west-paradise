import { Card, Flex, notification, Table } from "antd";
import FormSelectCategory from "../../common/select/category";
import { CategoryColumns } from "./colums";
import { usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import AddButton from "../../common/add-button";
import SearchBar from "../../common/search";
import { useState, useEffect } from "react";

export default function CategoryContent({}) {
    const { categories } = usePage().props;
    const [searchValue, setSearchValue] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [filteredCategories, setFilteredCategories] = useState(categories);

    const handleTypeFilter = (type) => {
        setSelectedType(type);
    };

    useEffect(() => {
        const lowerSearch = searchValue.toLowerCase();
        const filtered = categories.filter(
            (item) =>
                item.name_category.toLowerCase().includes(lowerSearch) &&
                (selectedType ? item.type_category === selectedType : true)
        );
        setFilteredCategories(filtered);
    }, [searchValue, selectedType, categories]);

    const columns = CategoryColumns({
        onDelete: (id) => {
            Inertia.delete(`/dashboard/categories/${id}`, {
                onSuccess: () => {
                    notification.success({
                        message: "Berhasil",
                        description: "Kategori berhasil dihapus.",
                    });
                },
                onError: (errors) => {
                    notification.error({
                        message: "Gagal",
                        description:
                            errors.name ||
                            "Terjadi kesalahan saat menghapus kategori.",
                    });
                },
            });
        },
    });
    return (
        <>
            <Card style={{ marginBottom: 16, borderRadius: 8 }}>
                <FormSelectCategory
                    category={categories}
                    onFilter={handleTypeFilter}
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
                            Inertia.visit("/dashboard/categories/create")
                        }
                        title="Tambah Kategori"
                    />
                    <SearchBar
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onSearch={() => {}}
                    />
                </Flex>
                <Table
                    columns={columns}
                    dataSource={filteredCategories}
                    rowKey="id"
                    pagination={{ position: ["bottomRight"] }}
                />
            </Card>
        </>
    );
}
