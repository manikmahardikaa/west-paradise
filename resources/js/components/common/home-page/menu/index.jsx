import { Card, Col, Row } from "antd";
import { HomePageMenu } from "@/data/home-page/menu";
import { Link } from "@inertiajs/inertia-react";

export default function HomePageMenuSection({ lang, locale }) {
    return (
        <div
            style={{
                background: "#EAEAEA",
                borderRadius: "24px",
                padding: "24px 16px",
                margin: "50px auto 0",
                maxWidth: 1200,
                boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
            }}
        >
            <Row gutter={[24, 24]} justify="center" align="middle">
                {HomePageMenu({ lang, locale }).map((item) => (
                    <Col
                        key={item.key}
                        xs={12} // 2 per baris di layar kecil (6 item jadi 3 baris)
                        sm={8} // 3 per baris di tablet
                        md={6} // 4 per baris di laptop
                        lg={6} // 4 per baris di desktop
                        xl={3} // 8 per baris di desktop lebar (jika cukup)
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Link
                            href={item.label.props.href}
                            style={{
                                width: "100%",
                                maxWidth: 160,
                                textDecoration: "none",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    textAlign: "center",
                                    color: "#222",
                                    padding: "16px 8px",
                                    borderRadius: 16,
                                    height: "100%",
                                    boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                                    transition: "transform 0.2s ease",
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform =
                                        "translateY(-4px)";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform =
                                        "translateY(0)";
                                }}
                            >
                                <div style={{ fontSize: 36, marginBottom: 12 }}>
                                    {item.icon}
                                </div>
                                <div
                                    style={{
                                        fontWeight: 500,
                                        fontSize: 16,
                                        lineHeight: "1.4em",
                                    }}
                                >
                                    {item.label.props.children}
                                </div>
                            </div>
                        </Link>
                    </Col>
                ))}
            </Row>
        </div>
    );
}
