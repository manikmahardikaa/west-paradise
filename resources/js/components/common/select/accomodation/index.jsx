import { Row, Col, Select } from "antd";
import { useState, useEffect } from "react";

export default function FormSelectAccomodation({ onFilter, accomodation }) {
    const [district, setDistrict] = useState("");
    const [village, setVillage] = useState("");

    const districts = Array.from(
        new Set(
            accomodation.map((item) => item.district?.trim()).filter(Boolean)
        )
    );
    const villages = Array.from(
        new Set(
            accomodation.map((item) => item.village?.trim()).filter(Boolean)
        )
    );

    useEffect(() => {
        if (onFilter) {
            onFilter({ district, village });
        }
    }, [district, village]);

    return (
        <Row gutter={[16, 16]}>
            <Col span={8}>
                <Select
                    placeholder="Pilih Kecamatan"
                    style={{ width: "100%" }}
                    value={district || undefined}
                    onChange={(val) => setDistrict(val)}
                    allowClear
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
                    placeholder="Pilih Desa/Kelurahan"
                    style={{ width: "100%" }}
                    value={village || undefined}
                    onChange={(val) => setVillage(val)}
                    allowClear
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
