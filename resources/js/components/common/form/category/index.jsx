import {
    Button,
    Card,
    Checkbox,
    Form,
    Input,
    Typography,
    Space,
    Select,
} from "antd";
import { useState } from "react";

const { Title, Text } = Typography;

export default function FormCategory({
    onSubmit,
    onCancel,
    process,
    initialValues,
    title,
}) {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleFinish = async (values) => {
        setLoading(true);
        await onSubmit(values);
        setLoading(false);
    };

    return (
        <div>
            <Card style={{ borderRadius: 10 }}>
                <Title level={4}>{title}</Title>

                {process === "update" ? (
                    <div
                        style={{
                            backgroundColor: "#fff",
                            padding: 24,
                            borderLeft: "6px solid orange",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                            marginBottom: 24,
                        }}
                    >
                        <Text>Edit kategori</Text>
                    </div>
                ) : (
                    <div
                        style={{
                            backgroundColor: "#fff",
                            padding: 24,
                            borderLeft: "6px solid orange",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                            marginBottom: 24,
                        }}
                    >
                        <Text>
                            Inputkan kategori seperti contoh berikut. Contoh{" "}
                            <b>(Pariwisata)</b>
                        </Text>
                    </div>
                )}

                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleFinish}
                    initialValues={initialValues}
                >
                    <Form.Item
                        label={<Text strong>Nama Kategori</Text>}
                        name="name_category"
                        rules={[
                            {
                                required: true,
                                message: "Harap isi nama kategori",
                            },
                        ]}
                    >
                        <Input
                            placeholder="Masukkan nama kategori..."
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item
                        label={<Text strong>Jenis Kategori</Text>}
                        name="type_category"
                        rules={[
                            {
                                required: true,
                                message: "Harap isi jenis kategori",
                            },
                        ]}
                    >
                        <Select size="large" placeholder="Pilih jenis kategori">
                            <Select.Option value="Umum">Umum</Select.Option>
                            <Select.Option value="Ekonomi Kreatif">
                                Ekonomi Kreatif
                            </Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name="status" valuePropName="checked">
                        <Checkbox>
                            Aktif{" "}
                            <Text
                                type="secondary"
                                italic
                                style={{ marginLeft: 8 }}
                            >
                                * Centang jika status Kategori aktif.
                            </Text>
                        </Checkbox>
                    </Form.Item>

                    <Space style={{ marginTop: 32 }}>
                        <Button onClick={onCancel} size="large" danger>
                            Batal
                        </Button>
                        <Button
                            htmlType="submit"
                            type="primary"
                            size="large"
                            loading={loading}
                            style={{
                                backgroundColor: "#22C55E",
                                borderColor: "#22C55E",
                            }}
                        >
                            Simpan
                        </Button>
                    </Space>
                </Form>
            </Card>
        </div>
    );
}
