import { Card, Checkbox, Divider, Typography } from "antd";
import translations from "../../../../lang/lang";

const { Title } = Typography;

export default function EventSelect({ events = [], locale }) {
    const categories = [...new Set(events.map((e) => e.category.name_category))];

    console.log(events);

    const t = translations[locale || "id"];

    return (
        <Card
            style={{
                width: 280,
                borderRadius: 12,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.06)",
            }}
            bodyStyle={{ padding: 24 }}
        >
            {/* Kategori */}
            <Title level={5} style={{ marginBottom: 16 }}>
                {t.destination.category}
            </Title>
            <Checkbox.Group
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
            >
                {categories.map((cat) => (
                    <Checkbox key={cat} value={cat}>
                        {cat}
                    </Checkbox>
                ))}
            </Checkbox.Group>

            {/* <Divider style={{ margin: "24px 0" }} /> */}

            {/* Kecamatan */}
            {/* <Title level={5} style={{ marginBottom: 16 }}>
                {t.destination.district}
            </Title>
            <Checkbox.Group
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
            >
                {districts.map((dist) => (
                    <Checkbox key={dist} value={dist}>
                        {dist}
                    </Checkbox>
                ))}
            </Checkbox.Group> */}
        </Card>
    );
}
