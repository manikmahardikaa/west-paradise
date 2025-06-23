import { Col, Image, Row } from "antd";
import translations from "../../../lang/lang";

export default function HeroSection({ locale }) {
    const t = translations[locale || "id"];
    return (
        <div style={{ padding: "48px 0" }}>
            <Row
                gutter={[48, 32]}
                align="middle"
                style={{ maxWidth: 1400, margin: "0 auto" }}
            >
                {/* Kiri: Teks */}
                <Col xs={24} md={12}>
                    <div>
                        <div
                            style={{
                                fontSize: 28,
                                fontWeight: 600,
                                marginBottom: 16,
                                fontFamily: "inherit",
                            }}
                        >
                            {t.heroSection.title}
                        </div>
                        <div
                            style={{
                                fontSize: 64,
                                fontWeight: 700,
                                lineHeight: "1.1",
                                marginBottom: 24,
                                fontFamily: "serif",
                            }}
                        >
                            {t.heroSection.subtitle}
                        </div>
                        <div
                            style={{
                                color: "#444",
                                fontSize: 18,
                                maxWidth: 520,
                                lineHeight: 1.7,
                                marginBottom: 0,
                            }}
                        >
                            {t.heroSection.description}
                        </div>
                    </div>
                </Col>

                {/* Kanan: Gambar dengan layer back */}
                <Col xs={24} md={12}>
                    <div
                        style={{
                            position: "relative",
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        {/* Layer belakang hijau rounded */}
                        <div
                            style={{
                                position: "absolute",
                                top: 32,
                                left: 32,
                                width: "90%",
                                height: "90%",
                                borderRadius: 32,
                                background: "#4b6651", // greenish
                                opacity: 0.65,
                                zIndex: 1,
                            }}
                        />
                        {/* Gambar thumbnail */}
                        <Image
                            src="/assets/images/youtube-thumbnail.jpg"
                            alt="Thumbnail Jembrana"
                            style={{
                                width: "100%",
                                maxWidth: 520,
                                borderRadius: 28,
                                boxShadow: "0 8px 32px rgba(0,0,0,0.20)",
                                zIndex: 2,
                                position: "relative",
                            }}
                        />
                    </div>
                </Col>
            </Row>
        </div>
    );
}
