import { Button, Col, Form, Input, Row, Select } from "antd";
import { parseReviewType } from "../../../../utils/parseReviewType";

export default function FormReviewSelect({ onFilter, review }) {
    const [form] = Form.useForm();
    const sector = Array.from(new Set(review.map((item) => item.review_type)));

    const handleChange = () => {
        const values = form.getFieldsValue();
        onFilter({
            sector: values.sector,
        });
    };

    return (
        <Form form={form} onFinish={handleChange} layout="vertical">
            <Row gutter={[16, 16]}>
                <Col span={8}>
                    <Form.Item name="sector">
                        <Select
                            placeholder="Pilih Sektor"
                            allowClear
                            onChange={handleChange}
                        >
                            {sector.map((sector) => (
                                <Select.Option key={sector} value={sector}>
                                    {parseReviewType(sector)}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
                {/* <Col span={8}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{ width: "100%" }}
                    >
                        Filter
                    </Button>
                </Col> */}
            </Row>
        </Form>
    );
}
