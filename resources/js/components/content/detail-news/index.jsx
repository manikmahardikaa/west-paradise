import { usePage } from "@inertiajs/inertia-react";
import { Typography, Image, Space, Button, Grid } from "antd";
import { EyeOutlined, CalendarOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import BackgroundHomePage from "../background-home-page";

const { useBreakpoint } = Grid;
const { Title } = Typography;

export default function DetailNewsContent() {
    const { data, locale } = usePage().props;

    const screens = useBreakpoint();

    return (
        <div style={{ fontFamily: "Poppins, sans-serif" }}>
            {/* Background Header */}
            <BackgroundHomePage>
                <Image
                    src={data.thumbnail}
                    alt={data.name}
                    style={{
                        width: "100%",
                        height: screens.xs ? "auto" : 460,
                        borderRadius: 12,
                        objectFit: "cover",
                        maxHeight: screens.xs ? "none" : 460,
                    }}
                />
            </BackgroundHomePage>

            {/* Konten Utama */}
            <div
                style={{
                    maxWidth: 900,
                    margin: "0 auto",
                    padding: "32px 24px",
                }}
            >
                {/* Judul */}
                <Title level={2} style={{ fontWeight: 700 }}>
                    {data.title}
                </Title>

                {/* Metadata */}
                <Space
                    style={{ color: "#777", fontSize: 14, marginBottom: 24 }}
                >
                    <EyeOutlined /> 200
                    <CalendarOutlined />{" "}
                    {dayjs(data.created_at)
                        .locale(locale)
                        .format("DD MMMM YYYY")}
                </Space>

                {/* Deskripsi */}
                <div
                    dangerouslySetInnerHTML={{ __html: data.description }}
                    style={{
                        fontSize: 16,
                        color: "#444",
                        lineHeight: "1.8",
                        marginTop: 16,
                    }}
                />
            </div>
        </div>
    );
}
