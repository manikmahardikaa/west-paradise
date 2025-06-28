import { useState } from "react";
import { usePage } from "@inertiajs/inertia-react";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";
import { Col, Divider, Empty, Row, Grid } from "antd";
import CustomCard from "../../common/card";
import SearchBar from "../../common/search";
import translations from "../../../lang/lang";

const { useBreakpoint } = Grid;

export default function SearchLocationContent() {
    const { data, locale } = usePage().props;
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    const t = translations[locale || "id"];
    const screens = useBreakpoint();

    const getAverageRating = (reviews = []) => {
        if (reviews.length === 0) return 0;
        const total = reviews.reduce((sum, r) => sum + r.rating, 0);
        return total / reviews.length;
    };

    const handleSearch = async (value) => {
        setSearchTerm(value);

        if (!value.trim()) {
            setIsSearching(false);
            setSearchResults([]);
            return;
        }

        setIsSearching(true);

        const response = await fetch(
            `/search?query=${encodeURIComponent(value)}`,
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                },
                credentials: "include",
            }
        );

        const result = await response.json();
        setSearchResults(result.data);
    };

    return (
        <div style={{ margin: screens.xs ? "80px 16px" : "120px 24px" }}>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
                <Title
                    level={1}
                    style={{
                        fontWeight: 700,
                        fontFamily: "Playfair Display",
                        fontSize: screens.xs ? 32 : 50,
                    }}
                >
                    {t.searchLocation.title}
                    <br />
                    {t.searchLocation.subTitle}
                </Title>
                <div style={{ marginTop: 20 }}>
                    <SearchBar
                        width={screens.xs ? "100%" : 500}
                        onSearch={handleSearch}
                        value={searchTerm}
                    />
                </div>
            </div>

            <div style={{ padding: screens.xs ? "0 16px" : "0 64px" }}>
                <Divider />
                <Title
                    level={1}
                    style={{
                        textAlign: "center",
                        fontWeight: 700,
                        fontFamily: "Playfair Display",
                    }}
                >
                    {t.searchLocation.title2}
                </Title>
                <Paragraph
                    style={{
                        textAlign: "center",
                        fontSize: 16,
                        maxWidth: 700,
                        margin: "0 auto 48px",
                    }}
                >
                    {t.searchLocation.description}
                </Paragraph>

                {isSearching ? (
                    searchResults.length > 0 ? (
                        <Row gutter={[24, 24]} justify="center">
                            {searchResults.map((item) => (
                                <Col
                                    key={item.id}
                                    xs={24}
                                    sm={12}
                                    md={8}
                                    lg={6}
                                >
                                    <CustomCard
                                        id={item.id}
                                        name={item.name}
                                        imageUrl={item.thumbnail}
                                        category={item.category?.name_category}
                                        district={item.district}
                                        type="destination"
                                        views={item.views?.length || 0}
                                        rating={getAverageRating(item.reviews)}
                                        locale={locale}
                                    />
                                </Col>
                            ))}
                        </Row>
                    ) : (
                        <div style={{ textAlign: "center", marginTop: 32 }}>
                            <Empty description={t.searchLocation.empty} />
                        </div>
                    )
                ) : (
                    <Row gutter={[24, 24]} justify="center">
                        {data.map((item) => (
                            <Col key={item.id} xs={24} sm={12} md={8} lg={6}>
                                <CustomCard
                                    id={item.id}
                                    name={item.name}
                                    imageUrl={item.thumbnail}
                                    category={item.category?.name_category}
                                    district={item.district}
                                    type="destination"
                                    views={item.views?.length || 0}
                                    rating={getAverageRating(item.reviews)}
                                    locale={locale}
                                />
                            </Col>
                        ))}
                    </Row>
                )}
            </div>
        </div>
    );
}
