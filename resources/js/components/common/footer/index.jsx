import React from "react";
import { Layout, Row, Col, Typography, Image } from "antd";
import {
    TikTokOutlined,
    YoutubeOutlined,
    FacebookOutlined,
    InstagramOutlined,
} from "@ant-design/icons";
import "./footer.css";
import translations from "../../../lang/lang";

const { Footer } = Layout;
const { Title, Text } = Typography;

export default function CustomFooter({ locale }) {
    const t = translations[locale || "id"];
    return (
        <Footer className="custom-footer">
            {/* <div className="footer-curve" /> */}
            <div className="footer-curve">
                <div className="hero-content">
                    <h1>{t.footer.title}</h1>
                    <h2>
                        <span className="highlight">{t.footer.subtitle}</span>
                    </h2>
                    <p>{t.footer.description}</p>
                </div>
            </div>
            <div className="footer-content">
                <Row gutter={[64, 32]} justify="space-between">
                    {/* Branding & Deskripsi */}
                    <Col xs={24} md={10} className="footer-column">
                        <div style={{ marginBottom: 36 }}>
                            <h3 className="brand-title">
                                {t.footer.brandTitle}
                                <span className="brand-subtitle">
                                    {t.footer.brandSubtitle}
                                </span>
                            </h3>
                        </div>
                        <Text className="footer-desc">
                            {t.footer.footerDesc}
                        </Text>
                    </Col>

                    {/* Quick Links */}
                    <Col xs={24} sm={12} md={4} className="footer-column">
                        <h4 className="footer-section-title">Quick Links</h4>
                        <ul className="footer-links">
                            <li>
                                <a href="/about">{t.navbar.about}</a>
                            </li>
                            <li>
                                <a href="/destinations">
                                    {t.navbar.destination}
                                </a>
                            </li>
                            <li>
                                <a href="/news">{t.navbar.news}</a>
                            </li>
                            <li>
                                <a href="/events">{t.navbar.event}</a>
                            </li>
                        </ul>
                    </Col>

                    {/* Media Sosial */}
                    <Col xs={24} sm={12} md={5} className="footer-column">
                        <h4 className="footer-section-title">
                            {t.socialMedia}
                        </h4>
                        <ul className="footer-social">
                            <li>
                                <TikTokOutlined /> Tiktok
                            </li>
                            <li>
                                <YoutubeOutlined /> YouTube
                            </li>
                            <li>
                                <FacebookOutlined /> Facebook
                            </li>
                            <li>
                                <InstagramOutlined /> Instagram
                            </li>
                        </ul>
                    </Col>

                    {/* Kontak Kami */}
                    <Col xs={24} sm={24} md={5} className="footer-column">
                        <h4 className="footer-section-title">
                            {t.footer.contactUs}
                        </h4>
                        <div
                            style={{
                                color: "#fff",
                                fontSize: "1.1rem",
                                marginBottom: 8,
                            }}
                        >
                            {t.footer.call}: (0365) 41210
                        </div>
                        <div style={{ color: "#fff", fontSize: "1.1rem" }}>
                            {t.footer.location}: Jl. Suropati No.1, Dauhwaru,
                            Kec. Negara, Kabupaten Jembrana, Bali 82218
                        </div>
                    </Col>
                </Row>
                <div className="footer-bottom">
                    <p>
                        © {new Date().getFullYear()} Disparbud Jembrana | All
                        rights raserved
                    </p>
                </div>
            </div>
        </Footer>
    );
}
