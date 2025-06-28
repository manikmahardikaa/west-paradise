import { Link, usePage } from "@inertiajs/inertia-react";
import { Col, Row, Typography, Button } from "antd";
import CustomCard from "../../card";
import EventCard from "../../event-card";
import dayjs from "dayjs";
import NewsCard from "../../news-card";
import translations from "../../../../lang/lang";

const { Title } = Typography;

export default function CardHomePage() {
    const {
        touristDestinations,
        restaurants,
        accomodations,
        events,
        news,
        locale,
    } = usePage().props;

    const currentLang =
        new URLSearchParams(window.location.search).get("lang") || "id";

    const t = translations[locale || "id"];
    return (
        <div
            style={{
                padding: "80px 60px 60px 60px",
                minHeight: "100vh",
            }}
        >
            {/* Destinasi Wisata */}
            <div style={{ marginBottom: 150 }}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 44,
                        gap: 36,
                        flexWrap: "wrap",
                    }}
                >
                    <Title
                        level={1}
                        style={{
                            margin: 0,
                            fontSize: 45,
                            fontWeight: 500,
                            fontFamily: "Playfair Display, serif",
                            lineHeight: "1.1",
                        }}
                    >
                        {t.type.destinasi}
                    </Title>
                    <Link
                        href={`/destination?lang=${currentLang}&type=destinasi`}
                    >
                        <Button
                            type="primary"
                            shape="round"
                            style={{
                                background: "#E81E4B",
                                color: "#fff",
                                fontSize: 15,
                                fontWeight: 500,
                                boxShadow: "0 4px 24px rgba(232,30,75,0.15)",
                                padding: "0 32px",
                                height: 56,
                                marginTop: 10,
                            }}
                        >
                            {t.cardHomePage.moreDestination}
                            <span style={{ marginLeft: 8, fontSize: 24 }}>
                                →
                            </span>
                        </Button>
                    </Link>
                </div>

                <Row gutter={[40, 36]} justify="start">
                    {touristDestinations.map((destination) => (
                        <Col
                            key={destination.id}
                            xs={24}
                            sm={12}
                            md={8}
                            lg={6}
                            style={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <CustomCard
                                name={destination.name}
                                imageUrl={destination.thumbnail}
                                category={destination.category?.name_category}
                                district={destination.district}
                                type="destination"
                                style={{
                                    borderRadius: 42,
                                    boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
                                    minWidth: 290,
                                    maxWidth: 340,
                                    width: "100%",
                                    margin: "0 auto",
                                }}
                            />
                        </Col>
                    ))}
                </Row>
            </div>

            {/* Restoran */}
            <div style={{ marginBottom: 150 }}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 44,
                        gap: 36,
                        flexWrap: "wrap",
                    }}
                >
                    <Title
                        level={1}
                        style={{
                            margin: 0,
                            fontSize: 45,
                            fontWeight: 500,
                            fontFamily: "Playfair Display, serif",
                            lineHeight: "1.1",
                        }}
                    >
                        {t.type.restoran}
                    </Title>
                    <Link href="/destination?type=restoran">
                        <Button
                            type="primary"
                            shape="round"
                            style={{
                                background: "#E81E4B",
                                color: "#fff",
                                fontSize: 15,
                                fontWeight: 500,
                                boxShadow: "0 4px 24px rgba(232,30,75,0.15)",
                                padding: "0 32px",
                                height: 56,
                                marginTop: 10,
                            }}
                        >
                            {t.cardHomePage.moreRestaurant}
                            <span style={{ marginLeft: 8, fontSize: 24 }}>
                                →
                            </span>
                        </Button>
                    </Link>
                </div>
                <Row gutter={[16, 24]} justify="start">
                    {restaurants.map((restaurant) => (
                        <Col key={restaurant.id} xs={24} sm={12} md={8} lg={6}>
                            <CustomCard
                                name={restaurant.name}
                                imageUrl={restaurant.thumbnail}
                                district={restaurant.district}
                                type="destination"
                                style={{
                                    borderRadius: 42,
                                    boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
                                    minWidth: 290,
                                    maxWidth: 340,
                                    width: "100%",
                                    margin: "0 auto",
                                }}
                            />
                        </Col>
                    ))}
                </Row>
            </div>

            {/* Akomodasi */}
            <div style={{ marginBottom: 150 }}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 44,
                        gap: 36,
                        flexWrap: "wrap",
                    }}
                >
                    <Title
                        level={1}
                        style={{
                            margin: 0,
                            fontSize: 45,
                            fontWeight: 500,
                            fontFamily: "Playfair Display, serif",
                            lineHeight: "1.1",
                        }}
                    >
                        {t.type.akomodasi}
                    </Title>
                    <Link href="/destination?type=akomodasi">
                        <Button
                            type="primary"
                            shape="round"
                            style={{
                                background: "#E81E4B",
                                color: "#fff",
                                fontSize: 15,
                                fontWeight: 500,
                                boxShadow: "0 4px 24px rgba(232,30,75,0.15)",
                                padding: "0 32px",
                                height: 56,
                                marginTop: 10,
                            }}
                        >
                            {t.cardHomePage.moreAccommodation}
                            <span style={{ marginLeft: 8, fontSize: 24 }}>
                                →
                            </span>
                        </Button>
                    </Link>
                </div>
                <Row gutter={[16, 24]} justify="start">
                    {accomodations.map((accomodation) => (
                        <Col
                            key={accomodation.id}
                            xs={24}
                            sm={12}
                            md={8}
                            lg={6}
                        >
                            <CustomCard
                                name={accomodation.name}
                                imageUrl={accomodation.thumbnail}
                                district={accomodation.district}
                                type="destination"
                                style={{
                                    borderRadius: 42,
                                    boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
                                    minWidth: 290,
                                    maxWidth: 340,
                                    width: "100%",
                                    margin: "0 auto",
                                }}
                            />
                        </Col>
                    ))}
                </Row>
            </div>

            {/* Kalender Event */}
            <div style={{ marginBottom: 150 }}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 44,
                        gap: 36,
                        flexWrap: "wrap",
                    }}
                >
                    <Title
                        level={1}
                        style={{
                            margin: 0,
                            fontSize: 45,
                            fontWeight: 500,
                            fontFamily: "Playfair Display, serif",
                            lineHeight: "1.1",
                        }}
                    >
                        {t.cardHomePage.event} {dayjs().year()}
                    </Title>
                    <Button
                        type="primary"
                        shape="round"
                        style={{
                            background: "#E81E4B",
                            color: "#fff",
                            fontSize: 15,
                            fontWeight: 500,
                            boxShadow: "0 4px 24px rgba(232,30,75,0.15)",
                            padding: "0 32px",
                            height: 56,
                            marginTop: 10,
                        }}
                    >
                        {t.cardHomePage.moreEvent}
                        <span style={{ marginLeft: 8, fontSize: 24 }}>→</span>
                    </Button>
                </div>
                <EventCard events={events} locale={locale} />
            </div>

            <div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: 48,
                        marginBottom: 44,
                        gap: 36,
                        flexWrap: "wrap",
                    }}
                >
                    <Title
                        level={1}
                        style={{
                            margin: 0,
                            fontSize: 45,
                            fontWeight: 500,
                            fontFamily: "Playfair Display, serif",
                            lineHeight: "1.1",
                        }}
                    >
                        {t.cardHomePage.news}
                    </Title>
                    <Button
                        type="primary"
                        shape="round"
                        style={{
                            background: "#E81E4B",
                            color: "#fff",
                            fontSize: 15,
                            fontWeight: 500,
                            boxShadow: "0 4px 24px rgba(232,30,75,0.15)",
                            padding: "0 32px",
                            height: 56,
                            marginTop: 10,
                        }}
                    >
                        {t.cardHomePage.moreNews}
                        <span style={{ marginLeft: 8, fontSize: 24 }}>→</span>
                    </Button>
                </div>
                {news.map((item) => (
                    <NewsCard
                        key={item.id}
                        title={item.title}
                        createdAt={item.created_at}
                        imageUrl={item.thumbnail}
                        style={{
                            borderRadius: 42,
                            boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
                            minWidth: 290,
                            maxWidth: 340,
                            width: "100%",
                            margin: "0 auto",
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
