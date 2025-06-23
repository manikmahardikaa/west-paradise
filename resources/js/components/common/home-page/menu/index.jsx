import { Card, Col, Row } from "antd";
import { HomePageMenu } from "@/data/home-page/menu";
import { Link } from "@inertiajs/inertia-react";

export default function HomePageMenuSection({ lang, locale }) {
    return (
        <div
            style={{
                background: "#EAEAEA",
                borderRadius: "24px",
                padding: "16px 0px",
                margin: "0 auto",
                marginTop: 50,
                maxWidth: 1200,
                boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
            }}
        >
            <Row
                gutter={[24, 24]}
                justify="center"
                align="middle"
                style={{ flexWrap: "wrap" }}
            >
                {HomePageMenu({ lang, locale }).map((item) => (
                    <Col
                        key={item.key}
                        xs={12} // 2 per baris di mobile (6 slot)
                        sm={8} // 3 per baris di tablet (8 slot)
                        md={6} // 4 per baris di laptop (6 slot)
                        lg={3} // 8 per baris di desktop (3 slot) => atau ubah lg={24/7}
                        xl={3} // 8 per baris juga, bisa lg={24/7} jika 7 item
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Link
                            href={item.label.props.href}
                            style={{ width: "100%" }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    textAlign: "center",
                                    color: "#222",
                                }}
                            >
                                <div style={{ fontSize: 36, marginBottom: 12 }}>
                                    {item.icon}
                                </div>
                                <div
                                    style={{
                                        fontWeight: 500,
                                        fontSize: 18,
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
