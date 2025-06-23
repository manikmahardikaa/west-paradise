import { Typography, Row, Col, Card } from "antd";
import Hero from "../../common/hero";
import translations from "../../../lang/lang";

const { Title, Paragraph } = Typography;

export default function AboutContent({ locale }) {
    const t = translations[locale || "id"];
    const features = t.aboutSection.features;

    return (
        <div style={{ background: "#f9f9f9" }}>
            <Hero
                image="/assets/images/hero-about.png"
                title={t.aboutSection.title}
                description={t.aboutSection.description}
            />

            {/* Tentang Section */}
            <div
                style={{
                    maxWidth: 1100,
                    margin: "48px auto 32px",
                    padding: "0 18px",
                }}
            >
                <Row gutter={[48, 24]} align="top">
                    <Col xs={24} md={10}>
                        <Title
                            level={4}
                            style={{ fontWeight: 400, marginBottom: 0 }}
                        >
                            {t.navbar.about}
                        </Title>
                        <Title
                            level={2}
                            style={{
                                margin: "0 0 16px",
                                fontWeight: 700,
                                lineHeight: 1.1,
                            }}
                        >
                            {t.aboutSection.subtitle}
                        </Title>
                    </Col>
                    <Col xs={24} md={14}>
                        <Paragraph style={{ fontSize: 16, marginBottom: 0 }}>
                            {t.aboutSection.paragraph}
                            <br />
                            <br />
                            {t.aboutSection.paragraph2}
                        </Paragraph>
                    </Col>
                </Row>

                <hr
                    style={{
                        margin: "40px 0 24px",
                        border: "none",
                        borderTop: "2px solid #eee",
                    }}
                />

                <Title
                    level={2}
                    style={{ textAlign: "center", marginBottom: 40 }}
                >
                    {t.aboutSection.textFeatures}
                </Title>

                {/* Features */}
                <Row
                    gutter={[24, 24]}
                    justify="center"
                    style={{ marginBottom: 16 }}
                >
                    {features.map((f, idx) => (
                        <Col
                            xs={24}
                            sm={12}
                            md={8}
                            lg={6}
                            key={f.title}
                            style={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <Card
                                bordered={false}
                                style={{
                                    borderRadius: 24,
                                    minHeight: 210,
                                    boxShadow:
                                        "0 4px 20px rgba(120,120,120,0.08)",
                                    textAlign: "center",
                                    background: "#fff",
                                    width: "100%",
                                    maxWidth: 250,
                                }}
                                bodyStyle={{ padding: "26px 20px" }}
                            >
                                <div style={{ fontSize: 40, marginBottom: 12 }}>
                                    {f.icon}
                                </div>
                                <div
                                    style={{
                                        fontWeight: 600,
                                        fontSize: 17,
                                        marginBottom: 7,
                                    }}
                                >
                                    {f.title}
                                </div>
                                <div style={{ fontSize: 14, color: "#7b7b7b" }}>
                                    {f.desc}
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>

            {/* Lokasi Kami Section */}
            <div
                style={{
                    background:
                        "linear-gradient(135deg, #4b665b 0%, #7fa084 100%)",
                    padding: "54px 0 48px 0",
                    color: "white",
                }}
            >
                <div
                    style={{
                        maxWidth: 1100,
                        margin: "0 auto",
                        padding: "0 18px",
                    }}
                >
                    <Title
                        level={2}
                        style={{
                            color: "#fff",
                            textAlign: "center",
                            marginBottom: 32,
                        }}
                    >
                        {t.aboutSection.locationUs}
                    </Title>
                    <div
                        style={{
                            borderRadius: 24,
                            overflow: "hidden",
                            boxShadow: "0 8px 32px rgba(0,0,0,0.13)",
                            margin: "0 auto",
                            background: "#fff",
                            maxWidth: 950,
                        }}
                    >
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3949.6523763551154!2d114.60934837413184!3d-8.142563181542125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd15a26b6a179a9%3A0x71e398e0c00560c0!2sJembrana%2C%20Bali!5e0!3m2!1sid!2sid!4v1683244322331!5m2!1sid!2sid"
                            width="100%"
                            height="370"
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Lokasi Jembrana"
                            style={{ border: 0 }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
