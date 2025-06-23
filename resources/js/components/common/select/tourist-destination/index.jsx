import { Button, Form, Row, Col, Select } from "antd";
import Title from "antd/es/typography/Title";
import { useState } from "react";

export default function FormSelectTouristDestination({
    onFilter,
    touristDestinations,
}) {
    const categories = Array.from(
        new Set(touristDestinations.map((item) => item.category?.name_category))
    );
    const districts = Array.from(
        new Set(touristDestinations.map((item) => item.district))
    );
    const villages = Array.from(
        new Set(touristDestinations.map((item) => item.village))
    );

    const [category, setCategory] = useState("");
    const [district, setDistrict] = useState("");
    const [village, setVillage] = useState("");

    const handleFilterChange = (field, value) => {
        const newFilters = {
            category: field === "category" ? value : category,
            district: field === "district" ? value : district,
            village: field === "village" ? value : village,
        };

        setCategory(newFilters.category);
        setDistrict(newFilters.district);
        setVillage(newFilters.village);

        // Kirim ke parent
        onFilter(newFilters);
    };

    return (
        <Form>
            <Title level={4} style={{ marginBottom: 16 }}>Filter</Title>
            <Row gutter={[16, 16]}>
                <Col span={6}>
                    <Select
                        placeholder="Pilih Kategori"
                        style={{ width: "100%" }}
                        value={category || undefined}
                        onChange={(value) =>
                            handleFilterChange("category", value)
                        }
                    >
                        {categories.map((category) => (
                            <Select.Option key={category} value={category}>
                                {category}
                            </Select.Option>
                        ))}
                    </Select>
                </Col>
                <Col span={6}>
                    <Select
                        placeholder="Pilih Kecamatan"
                        style={{ width: "100%" }}
                        value={district || undefined}
                        onChange={(value) =>
                            handleFilterChange("district", value)
                        }
                    >
                        {districts.map((district) => (
                            <Select.Option key={district} value={district}>
                                {district}
                            </Select.Option>
                        ))}
                    </Select>
                </Col>
                <Col span={6}>
                    <Select
                        placeholder="Desa/Kelurahan"
                        style={{ width: "100%" }}
                        value={village || undefined}
                        onChange={(value) =>
                            handleFilterChange("village", value)
                        }
                    >
                        {villages.map((village) => (
                            <Select.Option key={village} value={village}>
                                {village}
                            </Select.Option>
                        ))}
                    </Select>
                </Col>
                {/* <Col span={6}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{ width: "100%" }}
                    >
                        Submit
                    </Button>
                </Col> */}
            </Row>
        </Form>
    );
}
