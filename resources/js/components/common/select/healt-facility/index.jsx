import { Row, Col, Select } from "antd";
import { useState } from "react";

export default function FormSelectHealtFacility({ onFilter, healtFacility }) {
    const [district, setDistrict] = useState("");
    const [village, setVillage] = useState("");

    const districts = Array.from(
        new Set(
            healtFacility.map((item) => item.district?.trim()).filter(Boolean)
        )
    );
    const villages = Array.from(
        new Set(
            healtFacility.map((item) => item.village?.trim()).filter(Boolean)
        )
    );

    const handleFilterChange = (type, value) => {
        if (type === "district") {
            setDistrict(value);
            onFilter({ district: value, village });
        } else if (type === "village") {
            setVillage(value);
            onFilter({ district, village: value });
        }
    };

    return (
        <Row gutter={[16, 16]}>
            <Col span={8}>
                <Select
                    placeholder="Pilih Kecamatan"
                    style={{ width: "100%" }}
                    value={district || undefined}
                    onChange={(val) => handleFilterChange("district", val)}
                >
                    {districts.map((d) => (
                        <Select.Option key={d} value={d}>
                            {d}
                        </Select.Option>
                    ))}
                </Select>
            </Col>
            <Col span={8}>
                <Select
                    placeholder="Desa/Kelurahan"
                    style={{ width: "100%" }}
                    value={village || undefined}
                    onChange={(val) => handleFilterChange("village", val)}
                >
                    {villages.map((v) => (
                        <Select.Option key={v} value={v}>
                            {v}
                        </Select.Option>
                    ))}
                </Select>
            </Col>
        </Row>
    );
}
