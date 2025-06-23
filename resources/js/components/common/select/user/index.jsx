import { Button, Col, Form, Row, Select } from "antd";

export default function FormSelectUser({ onFilter, user }) {
    const isActive = Array.from(new Set(user.map((item) => item.is_active)));

    const parseActive = (active) => {
        if (active) {
            return "Aktif";
        } else {
            return "Tidak Aktif";
        }
    };
    return (
        <div>
            <Form>
                <Row gutter={[16, 16]}>
                    <Col span={8}>
                        <Select
                            placeholder="Pilih Status"
                            style={{ width: "100%" }}
                        >
                            {isActive.map((active) => (
                                <Select.Option key={active} value={active}>
                                    {parseActive(active)}
                                </Select.Option>
                            ))}
                        </Select>
                    </Col>
                    <Col span={8}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{ width: "30%" }}
                        >
                            Submit
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}
