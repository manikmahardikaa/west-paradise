import { Checkbox, Typography, Divider, Card, Space, Button } from "antd";
import { HomePageMenu } from "../../../../data/home-page/menu";
import { Link } from "@inertiajs/inertia-react";
import { useEffect, useState } from "react";
import translations from "../../../../lang/lang";

const { Title } = Typography;

export default function DestinationSelect({
    district,
    type,
    category,
    onFilterChange,
    locale,
}) {
    const types = [
        "destinasi",
        "desa-wisata",
        "restoran",
        "ekonomi-kreatif",
        "akomodasi",
        "transportasi",
        "fasilitas-kesehatan",
    ];

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedDistricts, setSelectedDistricts] = useState([]);

    const t = translations[locale || "id"];

    useEffect(() => {
        onFilterChange({
            category: selectedCategories,
            district: selectedDistricts,
        });
    }, [selectedCategories, selectedDistricts]);

    const currentLang = new URLSearchParams(window.location.search).get("lang");
    return (
        <>
            <Card
                style={{
                    borderRadius: 20,
                    padding: 24,
                    width: 270,
                    fontFamily: "Poppins, Inter, sans-serif",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
                    marginBottom: 24,
                }}
                bodyStyle={{ padding: 0 }}
            >
                <div style={{ padding: 24 }}>
                    {/* Kategori */}
                    {type === "destinasi" && (
                        <div>
                            <Title
                                level={5}
                                style={{
                                    margin: 0,
                                    marginBottom: 16,
                                    fontWeight: 700,
                                }}
                            >
                                {t.destination.category}
                            </Title>
                            <Checkbox.Group
                                style={{ width: "100%" }}
                                value={selectedCategories}
                                onChange={setSelectedCategories}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 14,
                                    }}
                                >
                                    {category.map((cat) => (
                                        <Checkbox
                                            key={cat}
                                            value={cat}
                                            style={{
                                                fontSize: 17,
                                                color: "#B0B0B0",
                                                fontWeight: 500,
                                            }}
                                        >
                                            {cat}
                                        </Checkbox>
                                    ))}
                                </div>
                            </Checkbox.Group>
                            <Divider style={{ margin: "26px 0 20px" }} />
                        </div>
                    )}

                    {/* Kecamatan */}
                    <Title
                        level={5}
                        style={{
                            margin: 0,
                            marginBottom: 16,
                            fontWeight: 700,
                        }}
                    >
                        {t.destination.district}
                    </Title>
                    <Checkbox.Group
                        style={{ width: "100%" }}
                        value={selectedDistricts}
                        onChange={setSelectedDistricts}
                    >
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 14,
                            }}
                        >
                            {district.map((dist) => (
                                <Checkbox
                                    key={dist}
                                    value={dist}
                                    style={{
                                        fontSize: 17,
                                        color: "#B0B0B0",
                                        fontWeight: 500,
                                    }}
                                >
                                    {dist}
                                </Checkbox>
                            ))}
                        </div>
                    </Checkbox.Group>
                </div>
            </Card>

            <Card
                style={{
                    borderRadius: 20,
                    padding: 24,
                    width: 270,
                    fontFamily: "Poppins, Inter, sans-serif",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
                }}
                bodyStyle={{ padding: 0 }}
            >
                <div style={{ padding: 24 }}>
                    <Title
                        level={5}
                        style={{
                            margin: 0,
                            marginBottom: 16,
                            fontWeight: 700,
                        }}
                    >
                        {t.destination.anotherPlace}
                    </Title>
                    <Space direction="vertical" style={{ width: "100%" }}>
                        {types.map((typeKey) => (
                            <Link
                                key={typeKey}
                                href={`/destination?type=${typeKey}&lang=${currentLang}`}
                            >
                                <Button
                                    type={
                                        type === typeKey ? "primary" : "default"
                                    }
                                    shape="round"
                                    block
                                    style={{
                                        background:
                                            type === typeKey
                                                ? "#E81E4B"
                                                : "transparent",
                                        color:
                                            type === typeKey ? "#fff" : "#666",
                                        borderColor:
                                            type === typeKey
                                                ? "#E81E4B"
                                                : "#d9d9d9",
                                        fontWeight: 500,
                                    }}
                                >
                                    {t.type[typeKey] ?? typeKey}
                                </Button>
                            </Link>
                        ))}
                    </Space>
                </div>
            </Card>
        </>
    );
}
