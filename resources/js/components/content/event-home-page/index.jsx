import Title from "antd/es/typography/Title";
import { Button, Card, Col, Flex, Pagination, Row, Alert } from "antd";
import SearchBar from "../../common/search";
import { usePage } from "@inertiajs/inertia-react";
import CardEvent from "../../common/card-event";
import EventSelect from "../../common/select/event-home-page";
import { useEffect, useState } from "react";
import Hero from "../../common/hero";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import translations from "../../../lang/lang";

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

export default function EventContent() {
    const { events = [], locale } = usePage().props;

    const t = translations[locale || "id"];

    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [activeFilter, setActiveFilter] = useState("");
    const [filteredEvents, setFilteredEvents] = useState([]);
    const pageSize = 4;

    useEffect(() => {
        handleFilterBy(activeFilter);
    }, [events, activeFilter]);

    const handleSearch = (value) => {
        setSearchTerm(value);
        setCurrentPage(1);
    };

    const handleResetAll = () => {
        setSearchTerm("");
        setCurrentPage(1);
        handleFilterBy(activeFilter);
    };

    const handleFilterBy = (type) => {
        const now = dayjs();
        let filtered = [...events];

        if (type === "terdekat") {
            filtered = filtered
                .filter(
                    (e) => !e.is_uncertain && dayjs(e.start_date).isAfter(now)
                )
                .sort((a, b) => dayjs(a.start_date).diff(dayjs(b.start_date)));
        } else if (type === "berlangsung") {
            filtered = filtered.filter(
                (e) =>
                    !e.is_uncertain &&
                    dayjs(e.start_date).isSameOrBefore(now, "day") &&
                    dayjs(e.end_date).isSameOrAfter(now, "day")
            );
        } else if (type === "selesai") {
            filtered = filtered.filter(
                (e) => !e.is_uncertain && dayjs(e.end_date).isBefore(now, "day")
            );
        } else if (type === "belum") {
            filtered = filtered.filter((e) => e.is_uncertain);
        }

        setFilteredEvents(filtered);
        setCurrentPage(1);
    };

    const searchFilteredEvents = filteredEvents.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const paginatedEvents = searchFilteredEvents.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    return (
        <>
            {/* Hero Section */}
            <Hero
                image="/assets/images/hero-event.png"
                title={t.event.hero.title}
                description={t.event.hero.description}
            />

            {/* Main Section */}
            <div style={{ margin: "12px 32px" }}>
                <div style={{ padding: 24 }}>
                    <Flex
                        justify="space-between"
                        align="center"
                        wrap="wrap"
                        style={{ gap: 16 }}
                    >
                        <Flex align="center" gap={16}>
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
                                {t.event.all}
                            </Button>
                            <Title
                                level={4}
                                style={{ margin: 0, fontWeight: 700 }}
                            >
                                {t.event.select}
                            </Title>
                        </Flex>
                        <SearchBar onSearch={handleSearch} value={searchTerm} />
                    </Flex>
                </div>

                {/* Content Section */}
                <div style={{ display: "flex", gap: 24, padding: "24px" }}>
                    {/* Sidebar */}
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 24,
                        }}
                    >
                        <EventSelect events={events} locale={locale} />
                    </div>

                    {/* Event Cards */}
                    <div style={{ flex: 1, marginLeft: 24 }}>
                        <Card style={{ borderRadius: 12 }}>
                            <Flex
                                gap={12}
                                wrap="wrap"
                                style={{ marginBottom: 24 }}
                            >
                                {[
                                    {
                                        label: t.event.filter.terdekat,
                                        value: "terdekat",
                                    },
                                    {
                                        label: t.event.filter.berlangsung,
                                        value: "berlangsung",
                                    },
                                    {
                                        label: t.event.filter.selesai,
                                        value: "selesai",
                                    },
                                    {
                                        label: t.event.filter.belum,
                                        value: "belum",
                                    },
                                ].map((btn) => (
                                    <Button
                                        key={btn.value}
                                        type={
                                            activeFilter === btn.value
                                                ? "primary"
                                                : "default"
                                        }
                                        shape="round"
                                        onClick={() =>
                                            setActiveFilter(btn.value)
                                        }
                                        style={{
                                            backgroundColor:
                                                activeFilter === btn.value
                                                    ? "#E81E4B"
                                                    : "transparent",
                                            color:
                                                activeFilter === btn.value
                                                    ? "#fff"
                                                    : "#E81E4B",
                                            borderColor: "#E81E4B",
                                            fontWeight: 500,
                                            boxShadow:
                                                activeFilter === btn.value
                                                    ? "0 4px 12px rgba(232, 30, 75, 0.4)"
                                                    : "none",
                                        }}
                                    >
                                        {btn.label}
                                    </Button>
                                ))}
                            </Flex>

                            {paginatedEvents.length === 0 ? (
                                <Alert
                                    type="info"
                                    message={t.event.notFound}
                                    showIcon
                                />
                            ) : (
                                <Row gutter={[24, 24]}>
                                    {paginatedEvents.map((item) => (
                                        <Col
                                            key={item.id}
                                            xs={24}
                                            sm={24}
                                            md={12}
                                            lg={12}
                                        >
                                            <CardEvent
                                                id={item.id}
                                                name={item.name}
                                                description={item.description}
                                                address={item.address}
                                                start_date={item.start_date}
                                                end_date={item.end_date}
                                                thumbnail={item.thumbnail}
                                                is_uncertain={item.is_uncertain}
                                                type_category={
                                                    item.type_category
                                                }
                                                locale={locale}
                                            />
                                        </Col>
                                    ))}
                                </Row>
                            )}
                        </Card>

                        {/* Pagination */}
                        <div style={{ textAlign: "center", marginTop: 32 }}>
                            <Pagination
                                current={currentPage}
                                total={searchFilteredEvents.length}
                                pageSize={pageSize}
                                onChange={(page) => setCurrentPage(page)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
