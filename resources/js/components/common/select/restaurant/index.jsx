import { Row, Col, Select } from "antd";
import { useState, useEffect } from "react";

export default function FormSelectRestaurant({ onFilter, restaurant }) {
    const [district, setDistrict] = useState("");
    const [village, setVillage] = useState("");

    const districts = Array.from(
        new Set(restaurant.map((item) => item.district?.trim()).filter(Boolean))
    );
    const villages = Array.from(
        new Set(restaurant.map((item) => item.village?.trim()).filter(Boolean))
    );

    // Kirim filter setiap kali district / village berubah
    useEffect(() => {
        onFilter({ district, village });
    }, [district, village]);

    return (
        <Row gutter={[16, 16]}>
            <Col span={8}>
                <Select
                    placeholder="Pilih Kecamatan"
                    style={{ width: "100%" }}
                    value={district || undefined}
                    allowClear
                    onChange={(val) => setDistrict(val || "")}
                >
                    {districts.map((district) => (
                        <Select.Option key={district} value={district}>
                            {district}
                        </Select.Option>
                    ))}
                </Select>
            </Col>
            <Col span={8}>
                <Select
                    placeholder="Desa/Kelurahan"
                    style={{ width: "100%" }}
                    value={village || undefined}
                    allowClear
                    onChange={(val) => setVillage(val || "")}
                >
                    {villages.map((village) => (
                        <Select.Option key={village} value={village}>
                            {village}
                        </Select.Option>
                    ))}
                </Select>
            </Col>
        </Row>
    );
}
