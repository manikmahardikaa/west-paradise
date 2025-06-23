import { usePage } from "@inertiajs/inertia-react";
import BackgroundHomePage from "../background-home-page";
import { Button, Col, Divider, Flex, Image, Row, Typography } from "antd";

import {
    ArrowLeftOutlined,
    CalendarOutlined,
    ClockCircleOutlined,
    EnvironmentOutlined,
    EyeOutlined,
    PhoneOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import "dayjs/locale/id";
dayjs.locale("id");
import { Inertia } from "@inertiajs/inertia";
import ReviewSection from "../../common/review";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import translations from "../../../lang/lang";

const { Title, Paragraph, Text } = Typography;

export default function DetailEventContent() {
    const { data, type, reviews, locale } = usePage().props;

    const t = translations[locale || "id"];

    const position = [parseFloat(data.latitude), parseFloat(data.longitude)];

    const time = `${dayjs(data.start_time, "HH:mm:ss").format(
        "HH:mm"
    )} – ${dayjs(data.end_time, "HH:mm:ss").format("HH:mm")}`;

    return (
        <div style={{ fontFamily: "Poppins, sans-serif" }}>
            {/* Background Header */}
            <div
                style={{
                    background: `url('/assets/images/bg-detail.png') center/cover no-repeat`,
                    padding: 48,
                    alignItems: "center",
                    backgroundSize: "cover",
                }}
            >
                <div>
                    <Flex
                        align="center"
                        gap={10}
                        style={{ marginBottom: 24, marginTop: 50 }}
                    >
                        <Button
                            type="text"
                            icon={
                                <ArrowLeftOutlined style={{ fontSize: 18 }} />
                            }
                            onClick={() => Inertia.visit(`/event`)}
                            style={{ color: "white" }}
                        />
                        <span
                            style={{
                                color: "white",
                                fontSize: 16,
                                fontWeight: 600,
                            }}
                        >
                            {t.event.detail}
                        </span>
                    </Flex>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Image
                            src={data.thumbnail}
                            alt={data.name}
                            style={{
                                maxWidth: "100%",
                                height: 460,
                                borderRadius: 12,
                                objectFit: "cover",
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Konten Utama */}
            <div
                style={{
                    fontFamily: "Poppins, sans-serif",
                    padding: "48px 72px",
                }}
            >
                {/* Judul */}
                <Title level={2} style={{ marginTop: 24, fontWeight: 700 }}>
                    {data.name}
                </Title>

                <span style={{ fontSize: 16, color: "gray" }}>
                    {t.destination.category} {data.category.name_category}
                </span>

                <div
                    dangerouslySetInnerHTML={{ __html: data.description }}
                    style={{
                        fontSize: 16,
                        color: "#444",
                        lineHeight: "1.8",
                        marginTop: 16,
                    }}
                />

                {/* Deskripsi */}
                <Row gutter={[48, 48]}>
                    <Col xs={24} lg={16}>
                        <Title level={4} style={{ fontWeight: 600 }}>
                            {t.event.description}
                        </Title>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: data.description,
                            }}
                            style={{
                                lineHeight: "1.8",
                                fontSize: 16,
                                color: "#444",
                            }}
                        />

                        <Divider />
                        <Title
                            level={4}
                            style={{
                                fontWeight: 600,
                                marginBottom: 12,
                                marginTop: 32,
                            }}
                        >
                            {t.event.schedule}
                        </Title>

                        {data.is_uncertain ? (
                            <>
                                <div style={{ marginBottom: 20 }}>
                                    <Flex
                                        align="center"
                                        gap={8}
                                        style={{ marginTop: 4 }}
                                    >
                                        <CalendarOutlined
                                            style={{
                                                color: "#1890ff",
                                                fontSize: 18,
                                            }}
                                        />
                                        <span
                                            style={{
                                                fontSize: 16,
                                                fontWeight: 500,
                                            }}
                                        >
                                            {t.event.uncertain}
                                        </span>
                                    </Flex>
                                </div>
                            </>
                        ) : (
                            <>
                                <div style={{ marginBottom: 20 }}>
                                    <Text
                                        style={{
                                            fontWeight: 500,
                                            color: "gray",
                                        }}
                                    >
                                        {t.event.startDate}
                                    </Text>
                                    <Flex
                                        align="center"
                                        gap={8}
                                        style={{ marginTop: 4 }}
                                    >
                                        <CalendarOutlined
                                            style={{
                                                color: "#1890ff",
                                                fontSize: 18,
                                            }}
                                        />
                                        <span
                                            style={{
                                                fontSize: 16,
                                                fontWeight: 500,
                                            }}
                                        >
                                            {dayjs(data.start_date).format(
                                                "DD MMMM YYYY"
                                            )}
                                        </span>
                                    </Flex>
                                </div>

                                {/* Tanggal Selesai */}
                                <div style={{ marginBottom: 20 }}>
                                    <Text
                                        style={{
                                            fontWeight: 500,
                                            color: "gray",
                                        }}
                                    >
                                        {t.event.endDate}
                                    </Text>
                                    <Flex
                                        align="center"
                                        gap={8}
                                        style={{ marginTop: 4 }}
                                    >
                                        <CalendarOutlined
                                            style={{
                                                color: "#E81E4B",
                                                fontSize: 18,
                                            }}
                                        />
                                        <span
                                            style={{
                                                fontSize: 16,
                                                fontWeight: 500,
                                            }}
                                        >
                                            {dayjs(data.end_date).format(
                                                "DD MMMM YYYY"
                                            )}
                                        </span>
                                    </Flex>
                                </div>

                                {/* Waktu Acara */}
                                <div>
                                    <Text
                                        style={{
                                            fontWeight: 500,
                                            color: "gray",
                                        }}
                                    >
                                        {t.event.eventTime}
                                    </Text>
                                    <Flex
                                        align="center"
                                        gap={8}
                                        style={{ marginTop: 4 }}
                                    >
                                        <ClockCircleOutlined
                                            style={{
                                                color: "#E81E4B",
                                                fontSize: 18,
                                            }}
                                        />
                                        <span
                                            style={{
                                                fontSize: 16,
                                                fontWeight: 500,
                                            }}
                                        >
                                            {time}
                                        </span>
                                    </Flex>
                                </div>
                            </>
                        )}

                        <Divider />

                        <Title level={4}>{t.event.anotherInformation}</Title>
                        <Paragraph>
                            <Text strong>{t.event.address}</Text>
                            <br />
                            <EnvironmentOutlined
                                style={{ color: "#E81E4B" }}
                            />{" "}
                            {data.address}
                        </Paragraph>
                        <Paragraph>
                            <Text strong>{t.event.contact}</Text>
                            <br />
                            <PhoneOutlined style={{ color: "#E81E4B" }} />{" "}
                            {data.contact}
                        </Paragraph>
                    </Col>

                    <Col xs={24} lg={8}>
                        <Title level={5}>{t.event.map}</Title>
                        <div
                            style={{
                                height: 200,
                                borderRadius: 8,
                                overflow: "hidden",
                            }}
                        >
                            <MapContainer
                                center={position}
                                zoom={13}
                                style={{
                                    height: 250,
                                    width: "100%",
                                    borderRadius: 10,
                                }}
                            >
                                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                <Marker position={position}>
                                    <Popup>{t.event.selectedPoint}</Popup>
                                </Marker>
                            </MapContainer>
                        </div>

                        <Divider />

                        <ReviewSection
                            id={data.id}
                            model={type}
                            reviews={reviews}
                            access="event"
                            locale={locale}
                        />
                    </Col>
                </Row>
            </div>
        </div>
    );
}
