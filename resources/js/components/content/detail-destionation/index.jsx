import { usePage } from "@inertiajs/inertia-react";
import {
    Typography,
    Row,
    Col,
    Divider,
    Tag,
    Space,
    Rate,
    Button,
    Image,
    Flex,
    Grid,
} from "antd";
import {
    EnvironmentOutlined,
    PhoneOutlined,
    ClockCircleOutlined,
    LinkOutlined,
    LeftOutlined,
    RightOutlined,
    ArrowLeftOutlined,
    EyeFilled,
    StarFilled,
} from "@ant-design/icons";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useRef } from "react";
import { Inertia } from "@inertiajs/inertia";
import ReviewSection from "../../common/review";
import CustomCard from "../../common/card";
import translations from "../../../lang/lang";

const { Title, Paragraph, Text } = Typography;
const { useBreakpoint } = Grid;

export default function DetailDestinationContent() {
    const { data, type, nearby, reviews, locale } = usePage().props;
    const t = translations[locale || "id"];
    const scrollRef = useRef(null);

    const screens = useBreakpoint();
    const isMobile = !screens.md;

    const images = [...data.images.map((img) => img.image_url)];
    const position = [parseFloat(data.latitude), parseFloat(data.longitude)];

    const scroll = (direction) => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: direction === "left" ? -200 : 200,
                behavior: "smooth",
            });
        }
    };

    // const parseType = (type) => {
    //     switch (type) {
    //         case "desa-wisata":
    //             return "Desa Wisata";
    //         case "destinasi":
    //             return "Destinasi Wisata";
    //         case "restoran":
    //             return "Restoran";
    //         case "akomodasi":
    //             return "Akomodasi";
    //         case "ekonomi-kreatif":
    //             return "Ekonomi Kreatif";
    //         case "fasilitas-kesehatan":
    //             return "Fasilitas Kesehatan";
    //         case "transportasi":
    //             return "Transportasi";
    //         default:
    //             return "Destinasi Wisata";
    //     }
    // };

    const parseType = (type, locale = "id") => {
        const t = translations[locale]?.type || translations.id.type;
        return t[type] || t["default"];
    };

    return (
        <>
            <div
                style={{
                    background: `url('/assets/images/bg-detail.png') center/cover no-repeat`,
                    padding: isMobile ? 24 : 48,
                    alignItems: "center",
                }}
            >
                <Flex
                    align="center"
                    gap={10}
                    style={{ marginBottom: 24, marginTop: isMobile ? 24 : 50 }}
                >
                    <Button
                        type="text"
                        icon={<ArrowLeftOutlined style={{ fontSize: 18 }} />}
                        onClick={() =>
                            Inertia.visit(`/destination/?type=${type}`)
                        }
                        style={{ color: "white" }}
                    />
                    <span
                        style={{
                            color: "white",
                            fontSize: 16,
                            fontWeight: 600,
                        }}
                    >
                        {t.label.detail} {parseType(type, locale)}
                    </span>
                </Flex>

                <Image.PreviewGroup>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Image
                            src={data.thumbnail}
                            alt={data.name}
                            style={{
                                width: "100%",
                                maxWidth: isMobile ? "100%" : 960,
                                height: isMobile ? "auto" : 460,
                                borderRadius: 12,
                                objectFit: "cover",
                            }}
                        />
                    </div>

                    {/* Carousel only visible when images.length > 0 */}
                    {images.length > 0 && (
                        <div
                            style={{
                                position: "relative",
                                marginTop: 16,
                                padding: isMobile ? "0 16px" : "0 48px",
                            }}
                        >
                            <Button
                                shape="circle"
                                icon={<LeftOutlined />}
                                onClick={() => scroll("left")}
                                style={{
                                    position: "absolute",
                                    left: 0,
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    zIndex: 1,
                                }}
                            />

                            <div
                                ref={scrollRef}
                                style={{
                                    display: "flex",
                                    gap: 12,
                                    overflowX: "auto",
                                    padding: "4px 0",
                                }}
                            >
                                {images.map((src, index) => (
                                    <Image
                                        key={index}
                                        width={isMobile ? 220 : 500}
                                        height={isMobile ? 140 : 300}
                                        style={{
                                            borderRadius: 10,
                                            objectFit: "cover",
                                            flexShrink: 0,
                                            cursor: "pointer",
                                        }}
                                        src={src}
                                        alt={`thumb-${index}`}
                                    />
                                ))}
                            </div>

                            <Button
                                shape="circle"
                                icon={<RightOutlined />}
                                onClick={() => scroll("right")}
                                style={{
                                    position: "absolute",
                                    right: 0,
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    zIndex: 1,
                                }}
                            />
                        </div>
                    )}
                </Image.PreviewGroup>
            </div>

            <div
                style={{
                    padding: "48px 72px",
                    fontFamily: "Poppins, sans-serif",
                }}
            >
                <Title level={2} style={{ marginTop: 24, fontWeight: 700 }}>
                    {data.name}
                </Title>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        color: "#777",
                    }}
                >
                    <EyeFilled style={{ fontSize: 18, marginRight: 4 }} />
                    <span>200</span>
                    <span style={{ margin: "0 8px" }}>|</span>
                    <span
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                        }}
                    >
                        <StarFilled style={{ color: "#ffc107" }} />{" "}
                        <span>(5)</span>
                    </span>
                </div>
                <Divider />

                <Row gutter={[48, 48]}>
                    <Col xs={24} lg={16}>
                        <Title level={4} style={{ fontWeight: 600 }}>
                            {t.label.description}
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

                        <Title level={4} style={{ fontWeight: 600 }}>
                            {t.label.otherInformation}
                        </Title>
                        <Space
                            direction="vertical"
                            size="middle"
                            style={{ fontSize: 15 }}
                        >
                            <div>
                                <Text strong style={{ marginTop: 10 }}>
                                    {t.label.address}
                                </Text>
                                <Paragraph>
                                    <EnvironmentOutlined
                                        style={{ color: "#E81E4B" }}
                                    />{" "}
                                    {data.address}
                                </Paragraph>
                            </div>
                            <div>
                                <Text strong>{t.label.village}</Text>
                                <Paragraph>
                                    {" "}
                                    <EnvironmentOutlined
                                        style={{
                                            color: "#E81E4B",
                                            marginRight: 4,
                                        }}
                                    />
                                    {data.village}
                                </Paragraph>
                            </div>
                            <div>
                                <Text strong>{t.label.district}</Text>
                                <Paragraph>
                                    {" "}
                                    <EnvironmentOutlined
                                        style={{
                                            color: "#E81E4B",
                                            marginRight: 4,
                                        }}
                                    />
                                    {data.district}
                                </Paragraph>
                            </div>
                            <div>
                                <Text strong>{t.label.contact}</Text>
                                <Paragraph>
                                    <PhoneOutlined
                                        style={{ color: "#E81E4B" }}
                                    />{" "}
                                    {data.contact}
                                </Paragraph>
                            </div>
                            <div>
                                <Text strong>{t.label.hours}</Text>
                                <Paragraph>
                                    <ClockCircleOutlined
                                        style={{ color: "#E81E4B" }}
                                    />{" "}
                                    {data.is_fullday === "1"
                                        ? "24 Jam"
                                        : data.start_time +
                                          " - " +
                                          data.end_time}
                                </Paragraph>
                            </div>
                            <div>
                                <Text strong>{t.label.facilities}</Text>
                                <Paragraph>
                                    {data.facilities
                                        ?.split(",")
                                        .map((item, i) => (
                                            <Tag key={i}>{item.trim()}</Tag>
                                        ))}
                                </Paragraph>
                            </div>
                            <div>
                                <Text strong>{t.label.googleBusiness}</Text>
                                <Paragraph>
                                    <a
                                        href={data.google_business_link}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <LinkOutlined /> Lihat di Google
                                    </a>
                                </Paragraph>
                            </div>
                        </Space>
                    </Col>

                    <Col xs={24} lg={8}>
                        <Title level={4} style={{ fontWeight: 600 }}>
                            {t.label.map}
                        </Title>
                        <MapContainer
                            center={position}
                            zoom={13}
                            style={{
                                height: 250,
                                width: "100%",
                                borderRadius: 10,
                            }}
                        >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution="&copy; OpenStreetMap contributors"
                            />
                            <Marker position={position}>
                                <Popup>{data.name}</Popup>
                            </Marker>
                        </MapContainer>

                        <Divider />

                        <ReviewSection
                            locale={locale}
                            id={data.id}
                            model={type}
                            reviews={reviews}
                            access="destination"
                        />
                    </Col>
                </Row>
            </div>

            {nearby && nearby.length > 0 && (
                <div
                    style={{
                        background:
                            "linear-gradient(to bottom, #3F5845, #4F7157, #5F8868, #6C9C77)",
                        padding: "48px 64px",
                        fontFamily: "Poppins, sans-serif",
                    }}
                >
                    <Title
                        level={2}
                        style={{
                            color: "white",
                            fontWeight: 700,
                            marginBottom: 32,
                            textAlign: "center",
                        }}
                    >
                        {t.label.nearbyPlaces}
                    </Title>

                    <Row gutter={[24, 24]} justify="center">
                        {nearby.map((item) => (
                            <Col key={item.id} xs={24} sm={12} md={8} lg={6}>
                                <CustomCard
                                    id={item.id}
                                    name={item.name}
                                    imageUrl={item.thumbnail}
                                    category={item.category?.name_category}
                                    district={item.district}
                                    model={item.type}
                                    type="destination"
                                />
                            </Col>
                        ))}
                    </Row>
                </div>
            )}
        </>
    );
}
