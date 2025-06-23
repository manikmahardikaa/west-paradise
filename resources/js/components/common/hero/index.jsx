import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";

export default function Hero({ image, title, description }) {
    return (
        <div
            style={{
                background: `url('${image}') center/cover no-repeat`,
                height: 400,
                color: "white",
                textAlign: "center",
                position: "relative",
            }}
        >
            <div
                style={{
                    background: "rgba(0,0,0,0.28)",
                    position: "absolute",
                    inset: 0,
                    zIndex: 1,
                }}
            />
            <div
                style={{
                    position: "relative",
                    zIndex: 2,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "0 24px",
                }}
            >
                <Title
                    level={1}
                    style={{
                        color: "#fff",
                        fontSize: 48,
                        marginBottom: 20,
                    }}
                >
                    {title}
                </Title>
                <Paragraph
                    style={{
                        color: "#fff",
                        fontSize: 18,
                        maxWidth: 700,
                        margin: "0 auto",
                    }}
                >
                    {description}
                </Paragraph>
            </div>
        </div>
    );
}