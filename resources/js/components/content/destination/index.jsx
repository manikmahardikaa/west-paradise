import {
    Row,
    Col,
    Typography,
    Pagination,
    Card,
    Flex,
    Button,
    Empty,
    notification,
} from "antd";
import DestinationSelect from "../../common/select/destination";
import { usePage } from "@inertiajs/inertia-react";
import CustomCard from "../../common/card";
import SearchBar from "../../common/search";
import { useState } from "react";
import Hero from "../../common/hero";
import translations from "../../../lang/lang";

const { Title } = Typography;

export default function DestinationContent() {
    const { categories, districts, data, type, locale } = usePage().props;
    const t = translations[locale || "id"];
    const [filteredData, setFilteredData] = useState(data);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedFilter, setSelectedFilter] = useState({
        category: [],
        district: [],
    });

    const applyFilter = (search = searchTerm, filter = selectedFilter) => {
        const { category, district } = filter;

        const newFiltered = data.filter((item) => {
            const matchCategory =
                category.length === 0 ||
                category.includes(item.category?.name_category);
            const matchDistrict =
                district.length === 0 || district.includes(item.district);
            const matchSearch =
                search === "" ||
                item.name.toLowerCase().includes(search.toLowerCase());

            return matchCategory && matchDistrict && matchSearch;
        });

        setFilteredData(newFiltered);

        if (newFiltered.length === 0) {
            notification.warning({
                message: "Tidak ada data ditemukan",
                description: "Coba ubah kata kunci pencarian atau filter Anda.",
                placement: "topRight",
            });
        }
    };

    const handleSearch = async (value) => {
        setSearchTerm(value);
        applyFilter(value, selectedFilter);

        if (value.trim().length >= 3) {
            try {
                await fetch("/log-search", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Requested-With": "XMLHttpRequest",
                        "X-CSRF-TOKEN": document.querySelector(
                            'meta[name="csrf-token"]'
                        ).content,
                    },
                    body: JSON.stringify({ type }),
                });
            } catch (error) {
                console.error("Gagal mencatat pencarian:", error);
            }
        }
    };

    const handleFilterChange = (filters) => {
        setSelectedFilter(filters);
        applyFilter(searchTerm, filters);
    };

    const handleResetAll = () => {
        setSearchTerm("");
        setSelectedFilter({ category: [], district: [] });
        setFilteredData(data);
    };

    const getHeroContent = (type = "destinasi", locale = "id") => {
        const fallbackContent = {
            title: locale === "en" ? "Explore Jembrana" : "Eksplorasi Jembrana",
            description:
                locale === "en"
                    ? "Discover interesting destinations and essential travel info about West Bali tourism."
                    : "Temukan destinasi menarik dan informasi penting seputar pariwisata Jembrana, Bali Barat.",
            image: "/assets/images/about-hero.jpg",
        };

        const contentList = translations?.[locale]?.destination?.hero[type];
        const content = Array.isArray(contentList) ? contentList[0] : null;

        if (!content) return fallbackContent;

        return {
            title: content.title,
            description: content.description,
            image: content.image || fallbackContent.image,
        };
    };

    const { title, description, image } = getHeroContent(type, locale);

    return (
        <div>
            <Hero image={image} title={title} description={description} />

            <div style={{ padding: "0px 50px", marginTop: 30 }}>
                <div>
                    <Flex
                        justify="space-between"
                        align="center"
                        wrap="wrap"
                        style={{ gap: 16 }}
                    >
                        <Flex align="center" gap={16} wrap="wrap">
                            <Title
                                level={4}
                                style={{ margin: 0, fontWeight: 700 }}
                            >
                                Filter
                            </Title>
                            <Button
                                onClick={handleResetAll}
                                type="primary"
                                shape="round"
                                style={{
                                    backgroundColor: "#E81E4B",
                                    border: "none",
                                    fontWeight: 500,
                                }}
                            >
                                {t.destination.all}
                            </Button>
                            <Title
                                level={4}
                                style={{ margin: 0, fontWeight: 700 }}
                            >
                                {t.destination.select} {title}
                            </Title>
                        </Flex>
                        <div style={{ width: "100%", maxWidth: 320 }}>
                            <SearchBar
                                onSearch={handleSearch}
                                value={searchTerm}
                            />
                        </div>
                    </Flex>
                </div>

                {/* Content */}
                <Row gutter={[24, 24]} style={{ padding: 24 }}>
                    {/* Sidebar */}
                    <Col xs={24} lg={6}>
                        <DestinationSelect
                            category={categories}
                            district={districts}
                            type={type}
                            onFilterChange={handleFilterChange}
                            locale={locale}
                        />
                    </Col>

                    {/* Cards */}
                    <Col xs={24} lg={18}>
                        <Card
                            style={{
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                borderRadius: "8px",
                            }}
                            bodyStyle={{ padding: 24 }}
                        >
                            {filteredData.length > 0 ? (
                                <Row gutter={[24, 24]} justify="start">
                                    {filteredData.map((item) => {
                                        const viewsCount =
                                            item.views?.length || 0;
                                        const averageRating =
                                            item.reviews &&
                                            item.reviews.length > 0
                                                ? item.reviews.reduce(
                                                      (acc, curr) =>
                                                          acc + curr.rating,
                                                      0
                                                  ) / item.reviews.length
                                                : 0;

                                        return (
                                            <Col
                                                key={item.id}
                                               
                                            >
                                                <CustomCard
                                                    id={item.id}
                                                    name={item.name}
                                                    imageUrl={item.thumbnail}
                                                    category={
                                                        item.category
                                                            ?.name_category
                                                    }
                                                    district={item.district}
                                                    model={type}
                                                    width={300}
                                                    type="destination"
                                                    views={viewsCount}
                                                    rating={averageRating}
                                                    locale={locale}
                                                />
                                            </Col>
                                        );
                                    })}
                                </Row>
                            ) : (
                                <Empty description="Data tidak ditemukan" />
                            )}
                        </Card>

                        <div style={{ textAlign: "right", marginTop: 32 }}>
                            <Pagination
                                defaultCurrent={1}
                                total={filteredData.length}
                                pageSize={8}
                            />
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
}
