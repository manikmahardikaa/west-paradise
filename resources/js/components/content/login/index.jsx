import {
    Button,
    Card,
    Checkbox,
    Flex,
    Form,
    Input,
    notification,
    Typography,
} from "antd";
import { useState } from "react";

const { Title } = Typography;

export default function LoginContent({ onSubmit }) {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            await onSubmit(values);
        } catch (error) {
            notification.error({
                message: "Login Gagal",
                description: "Email atau password salah.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                position: "relative",
                width: "100%",
                height: "100vh",
                backgroundImage: "url('/assets/images/background-login.jpeg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    zIndex: 1,
                }}
            />
            <div
                style={{
                    position: "relative",
                    zIndex: 2,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                }}
            >
                <Card
                    style={{
                        width: 400,
                        backdropFilter: "blur(10px)",
                        backgroundColor: "rgba(255, 255, 255, 0.08)",
                        borderRadius: 10,
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
                        color: "#fff",
                    }}
                    bodyStyle={{ padding: 32 }}
                >
                    <div style={{ textAlign: "center", marginBottom: 24 }}>
                        <img
                            src="/assets/images/logo-kab.png"
                            alt="Logo"
                            style={{ height: 80, marginBottom: 16 }}
                        />
                        <Title level={4} style={{ color: "#fff" }}>
                            Sign to Admin
                        </Title>
                    </div>

                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label={
                                <span style={{ color: "#fff" }}>Username</span>
                            }
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: "Harap isi email",
                                },
                            ]}
                        >
                            <Input
                                size="large"
                                style={{
                                    backgroundColor: "#fff",
                                    color: "#000",
                                }}
                            />
                        </Form.Item>

                        <Form.Item
                            label={
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        color: "#fff",
                                    }}
                                >
                                    <span>Password</span>
                                </div>
                            }
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Harap isi password",
                                },
                            ]}
                        >
                            <Input.Password
                                size="large"
                                style={{
                                    backgroundColor: "#fff",
                                    color: "#000",
                                }}
                            />
                        </Form.Item>

                        <Flex justify="space-between" align="middle">
                            <Form.Item
                                name="remember"
                                valuePropName="checked"
                                noStyle
                            >
                                <Checkbox
                                    style={{ color: "#fff", marginBottom: 16 }}
                                >
                                    Ingat Saya
                                </Checkbox>
                            </Form.Item>
                            <a href="#" style={{ color: "#fff", fontSize: 16 }}>
                                Lupa Password?
                            </a>
                        </Flex>

                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            size="large"
                            block
                            style={{
                                backgroundColor: "#294334",
                                borderColor: "#294334",
                                marginTop: 16,
                            }}
                        >
                            Login
                        </Button>
                    </Form>
                </Card>
            </div>
        </div>
    );
}
