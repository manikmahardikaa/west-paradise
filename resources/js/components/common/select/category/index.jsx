import { Button, Form, Row, Col, Select } from "antd";
import { useState } from "react";

export default function FormSelectCategory({ category, onFilter }) {
    const [selectedType, setSelectedType] = useState("");
    const uniqueTypes = Array.from(
        new Set(category.map((item) => item.type_category))
    );

    return (
        <div>
            <Form layout="vertical">
                <Row gutter={[16, 16]} align="bottom">
                    <Col span={8}>
                        <Form.Item
                            label="Jenis Kategori"
                            style={{ marginBottom: 0 }}
                        >
                            <Select
                                placeholder="Kategori Destinasi Wisata"
                                style={{
                                    width: "100%",
                                    height: "45px",
                                }}
                                size="large"
                                value={
                                    selectedType || "Kategori Destinasi Wisata"
                                }
                                onChange={(value) => setSelectedType(value)}
                            >
                                {uniqueTypes.map((type) => (
                                    <Select.Option key={type} value={type}>
                                        {type}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Button
                            type="primary"
                            onClick={() => onFilter(selectedType)}
                            icon={<i className="fas fa-search" />}
                            size="large"
                            style={{
                                width: "100%",
                                height: "45px",
                            }}
                        >
                            Cari
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}
