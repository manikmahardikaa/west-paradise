import { usePage } from "@inertiajs/inertia-react";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import {
    Row,
    Col,
    Pagination,
    Card,
    Flex,
    Button,
    Empty,
    notification,
    Grid,
} from "antd";
import CustomCard from "../../common/card";
import SearchBar from "../../common/search";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import Hero from "../../common/hero";
import translations from "../../../lang/lang";

export default function NewsContent() {
    const { news = [], locale } = usePage().props;
    const screens = Grid.useBreakpoint();
    const t = translations[locale || "id"];

    const [searchTerm, setSearchTerm] = useState("");
    const [filteredNews, setFilteredNews] = useState(news);
    const [activeFilter, setActiveFilter] = useState("terbaru");
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 8;

    const handleFilterBy = (type) => {
        let sorted = [...news];

        if (type === "terbaru") {
            sorted.sort((a, b) =>
                dayjs(b.created_at).isAfter(dayjs(a.created_at)) ? 1 : -1
            );
        } else if (type === "terlama") {
            sorted.sort((a, b) =>
                dayjs(a.created_at).isAfter(dayjs(b.created_at)) ? 1 : -1
            );
        } else if (type === "terpopuler") {
            sorted.sort(
                (a, b) => (b.popular_score || 0) - (a.popular_score || 0)
            );
        }

        setActiveFilter(type);
        setFilteredNews(sorted);
        setCurrentPage(1);
    };

    const handleSearch = (value) => {
        const filtered = news.filter((item) =>
            item.title.toLowerCase().includes(value.toLowerCase())
        );

        setSearchTerm(value);
        setFilteredNews(filtered);
        setCurrentPage(1);

        if (value && filtered.length === 0) {
            notification.warning({
                message: t.news.notification.notFound,
                description: t.news.notification.searchNotFound,
                placement: "topRight",
            });
        }
    };

    useEffect(() => {
        setFilteredNews(news);
    }, [news]);

    const paginatedNews = filteredNews.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    return (
        <>
            <Hero
                image="/assets/images/hero-news.png"
                title={t.news.title}
                description={t.news.description}
            />

            <div style={{ margin: screens.xs ? "0 16px" : "0 40px" }}>
                <div
                    style={{
                        padding: screens.xs ? 16 : "32px 32px 0",
                        background: "#fff",
                    }}
                >
                    <Flex
                        justify="space-between"
                        align="center"
                        wrap="wrap"
                        style={{ gap: 16 }}
                    >
                        <Flex align="center" gap={16} wrap>
                            <Title
                                level={4}
                                style={{
                                    margin: 0,
                                    fontWeight: 700,
                                    fontFamily: "Poppins, sans-serif",
                                }}
                            >
                                {t.news.newsForYou}
                            </Title>
                            <Button
                                type="primary"
                                shape="round"
                                onClick={() => {
                                    setSearchTerm("");
                                    setFilteredNews(news);
                                }}
                                style={{
                                    backgroundColor: "#E81E4B",
                                    border: "none",
                                    fontWeight: 500,
                                    boxShadow:
                                        "0 4px 12px rgba(232, 30, 75, 0.4)",
                                }}
                            >
                                {t.news.all}
                            </Button>
                        </Flex>

                        <SearchBar onSearch={handleSearch} value={searchTerm} />
                    </Flex>
                </div>

                <div style={{ padding: screens.xs ? 16 : 32 }}>
                    {filteredNews.length === 0 ? (
                        <Empty description={t.news.notification.notFound} />
                    ) : (
                        <>
                            <Card style={{ borderRadius: 8 }}>
                                <Flex
                                    gap={15}
                                    style={{
                                        marginBottom: 24,
                                        flexWrap: "wrap",
                                    }}
                                >
                                    {["terbaru", "terlama", "populer"].map(
                                        (value) => (
                                            <Button
                                                key={value}
                                                type={
                                                    activeFilter === value
                                                        ? "primary"
                                                        : "default"
                                                }
                                                onClick={() =>
                                                    handleFilterBy(value)
                                                }
                                                shape="round"
                                                style={{
                                                    backgroundColor:
                                                        activeFilter === value
                                                            ? "#E81E4B"
                                                            : "transparent",
                                                    color:
                                                        activeFilter === value
                                                            ? "#fff"
                                                            : "#E81E4B",
                                                    borderColor: "#E81E4B",
                                                    fontWeight: 500,
                                                    boxShadow:
                                                        activeFilter === value
                                                            ? "0 4px 12px rgba(232, 30, 75, 0.4)"
                                                            : "none",
                                                }}
                                            >
                                                {t.news.filter[value]}
                                            </Button>
                                        )
                                    )}
                                </Flex>

                                <Row gutter={[24, 24]}>
                                    {paginatedNews.map((item) => (
                                        <Col
                                            key={item.id}
                                            xs={24}
                                            sm={12}
                                            md={8}
                                            lg={6}
                                        >
                                            <CustomCard
                                                slug={item.slug}
                                                name={item.title}
                                                imageUrl={item.thumbnail}
                                                category={null}
                                                district={null}
                                                createdAt={item.created_at}
                                                locale={locale}
                                            />
                                        </Col>
                                    ))}
                                </Row>

                                <div
                                    style={{
                                        textAlign: "center",
                                        marginTop: 32,
                                    }}
                                >
                                    <Pagination
                                        current={currentPage}
                                        total={filteredNews.length}
                                        pageSize={pageSize}
                                        onChange={(page) =>
                                            setCurrentPage(page)
                                        }
                                    />
                                </div>
                            </Card>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
