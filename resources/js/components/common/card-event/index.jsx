import { Card, Typography, Tag, Grid } from "antd";
import { EnvironmentOutlined, CalendarOutlined } from "@ant-design/icons";
import parse from "html-react-parser";
import dayjs from "dayjs";
import "dayjs/locale/id";
import { Inertia } from "@inertiajs/inertia";
import translations from "../../../lang/lang";

const { Title, Paragraph, Text } = Typography;
const { useBreakpoint } = Grid;

dayjs.locale("id");

export default function CardEvent({
    name,
    description,
    address,
    start_date,
    end_date,
    thumbnail,
    type_category,
    id,
    is_uncertain,
    locale,
}) {
    const screens = useBreakpoint();
    const parsedDesc = parse(description);
    const formattedDate =
        start_date === end_date
            ? dayjs(start_date).format("DD MMMM YYYY")
            : `${dayjs(start_date).format("DD")} – ${dayjs(end_date).format(
                  "DD MMMM YYYY"
              )}`;

    const t = translations[locale || "id"];

    return (
        <Card
            style={{
                borderRadius: 24,
                padding: 12,
                width: "100%",
                boxShadow: "0 6px 16px rgba(0, 0, 0, 0.06)",
                cursor: "pointer",
            }}
            bodyStyle={{ padding: 12 }}
            onClick={() => {
                Inertia.visit(
                    `/detail-event/?id=${id}&type=event&lang=${locale}`
                );
            }}
        >
            <div
                style={{
                    display: "flex",
                    gap: 18,
                    flexDirection: screens.xs ? "column" : "row",
                    alignItems: screens.xs ? "center" : "flex-start",
                }}
            >
                {/* Thumbnail */}
                <div
                    style={{
                        position: "relative",
                        width: screens.xs ? "100%" : 180,
                        height: 140,
                        overflow: "hidden",
                        borderRadius: 16,
                    }}
                >
                    <img
                        src={thumbnail}
                        alt={name}
                        style={{
                            width: "100%",
                            height: "100%,",
                            objectFit: "cover",
                            borderRadius: 16,
                        }}
                    />
                    <Tag
                        color="#999"
                        style={{
                            position: "absolute",
                            bottom: 8,
                            left: 8,
                            background: "rgba(0,0,0,0.5)",
                            color: "#fff",
                            fontWeight: 500,
                            borderRadius: 12,
                            padding: "2px 8px",
                            fontSize: 12,
                        }}
                    >
                        Kategori {type_category}
                    </Tag>
                </div>

                {/* Content */}
                <div style={{ flex: 1, width: "100%" }}>
                    <Title level={5} style={{ marginBottom: 4 }}>
                        {name}
                    </Title>
                    <Paragraph
                        style={{
                            fontSize: 14,
                            marginBottom: 12,
                            maxHeight: 66,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}
                    >
                        {parsedDesc}
                    </Paragraph>

                    <div
                        style={{
                            display: "flex",
                            gap: 24,
                            flexWrap: "wrap",
                            flexDirection: screens.xs ? "column" : "row",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                gap: 6,
                                alignItems: "center",
                            }}
                        >
                            <EnvironmentOutlined style={{ color: "#f44336" }} />
                            <Text>{address}</Text>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                gap: 6,
                                alignItems: "center",
                            }}
                        >
                            <CalendarOutlined style={{ color: "#4caf50" }} />
                            {is_uncertain ? (
                                <Text type="warning">{t.event.uncertain}</Text>
                            ) : (
                                <Text>{formattedDate}</Text>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
}
