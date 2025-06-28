import { Typography } from "antd";
import translations from "../../../lang/lang";
const { Title } = Typography;

export default function HeroSection({ locale }) {
    const t = translations[locale || "id"];
    return (
        <div
            style={{
                padding: "48px 16px",
                textAlign: "center",
                boxSizing: "border-box",
            }}
        >
            <Title
                level={2}
                style={{
                    margin: 0,
                    fontFamily: "Playfair Display",
                    fontSize: "clamp(28px, 5vw, 40px)",
                }}
            >
                {t.heroSection.title}
            </Title>

            <div
                style={{
                    marginTop: 50,
                    width: "100%",
                    maxWidth: 1000,
                    aspectRatio: "16 / 9",
                    overflow: "hidden",
                    borderRadius: "16px",
                    marginInline: "auto",
                    backgroundColor: "#000",
                    position: "relative",
                }}
            >
                <iframe
                    src="https://www.youtube.com/embed/U283cQNO4FE"
                    title="Video Promosi Jembrana"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{
                        width: "100%",
                        height: "100%",
                        border: "none",
                        borderRadius: "16px",
                        display: "block",
                    }}
                ></iframe>
            </div>
        </div>
    );
}
