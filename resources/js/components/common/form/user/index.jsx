import {
    Form,
    Input,
    Select,
    Checkbox,
    Button,
    Row,
    Col,
    Typography,
    Divider,
} from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useState } from "react";

const { Title, Text } = Typography;

export default function FormUser({
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
    };

    return (
        <div style={{ padding: 24 }}>
            <Title level={4}>{title}</Title>
            <Divider />
            <Form
                form={form}
                layout="vertical"
                onFinish={handleFinish}
                initialValues={initialValues}
            >
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            label="NIK"
                            name="no_identity"
                            rules={[
                                {
                                    required: true,
                                    message: "Masukkan NIK Admin",
                                },
                            ]}
                        >
                            <Input placeholder="Masukkan NIK Admin" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Nama"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: "Masukkan Nama Admin",
                                },
                            ]}
                        >
                            <Input placeholder="Masukkan Nama Admin" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: "Masukkan Email Admin",
                                },
                                {
                                    type: "email",
                                    message: "Format email tidak valid",
                                },
                            ]}
                        >
                            <Input placeholder="Masukkan Email Admin" />
                        </Form.Item>
                    </Col>
                </Row>
                {process === "update" && (
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
                            Kosongkan password jika tidak ingin merubah password{" "}
                        </Text>
                    </div>
                )}
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={
                                process === "create"
                                    ? [
                                          {
                                              required: true,
                                              message: "Masukkan Password",
                                          },
                                      ]
                                    : []
                            }
                        >
                            <Input.Password
                                placeholder="Masukkan Password"
                                iconRender={(visible) =>
                                    visible ? (
                                        <EyeTwoTone />
                                    ) : (
                                        <EyeInvisibleOutlined />
                                    )
                                }
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Konfirmasi Password"
                            name="password_confirmation"
                            dependencies={["password"]}
                            rules={
                                process === "create"
                                    ? [
                                          {
                                              required: true,
                                              message:
                                                  "Konfirmasi password wajib diisi",
                                          },
                                          ({ getFieldValue }) => ({
                                              validator(_, value) {
                                                  if (
                                                      !value ||
                                                      getFieldValue(
                                                          "password"
                                                      ) === value
                                                  ) {
                                                      return Promise.resolve();
                                                  }
                                                  return Promise.reject(
                                                      new Error(
                                                          "Konfirmasi password tidak cocok"
                                                      )
                                                  );
                                              },
                                          }),
                                      ]
                                    : []
                            }
                        >
                            <Input.Password
                                placeholder="Masukkan Password yang sudah dibuat"
                                iconRender={(visible) =>
                                    visible ? (
                                        <EyeTwoTone />
                                    ) : (
                                        <EyeInvisibleOutlined />
                                    )
                                }
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item name="is_active" valuePropName="checked">
                    <Checkbox>
                        Publish <em> * Centang jika Akun aktif.</em>
                    </Checkbox>
                </Form.Item>

                <Row justify="end" gutter={16}>
                    <Col>
                        <Button danger> Batal </Button>
                    </Col>
                    <Col>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            style={{ backgroundColor: "#1bc500" }}
                        >
                            Simpan
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}
