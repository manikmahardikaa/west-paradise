import {
    Row,
    Col,
    Typography,
    Rate,
    Divider,
    Pagination,
    Progress,
    Button,
    Flex,
    Card,
    notification,
} from "antd";
import { ArrowLeftOutlined, StarFilled } from "@ant-design/icons";
import FormReview from "../../common/form/review";
import { usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import FormReviewSelect from "../../common/select/review";
import { useState, useEffect } from "react";

const { Paragraph } = Typography;

const handleFinish = (values) => {
    Inertia.post("/review", values, {
        onSuccess: () => {
            notification.success({
                message: "Berhasil",
                description: "Review berhasil ditambahkan.",
            });
        },
        onError: (errors) => {
            notification.error({
                message: "Gagal",
                description:
                    errors.name || "Terjadi kesalahan saat menambahkan review.",
            });
        },
    });
};

export default function ReviewContent() {
    const { id, type, reviews, access } = usePage().props;

    const [selectedSector, setSelectedSector] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [filteredReviews, setFilteredReviews] = useState(reviews);

    useEffect(() => {
        const filtered = reviews.filter((review) => {
            const matchSector = selectedSector
                ? review.review_type === selectedSector
                : true;
            const matchSearch = searchValue
                ? review.review
                      ?.toLowerCase()
                      .includes(searchValue.toLowerCase())
                : true;
            return matchSector && matchSearch;
        });
        setFilteredReviews(filtered);
    }, [reviews, selectedSector, searchValue]);

    const ratingStats = [5, 4, 3, 2, 1].map((star) => {
        const total = filteredReviews.length;
        const count = filteredReviews.filter((r) => r.rating === star).length;
        return {
            star,
            percent: total > 0 ? Math.round((count / total) * 100) : 0,
        };
    });

    const averageRating =
        filteredReviews.length > 0
            ? (
                  filteredReviews.reduce((sum, r) => sum + r.rating, 0) /
                  filteredReviews.length
              ).toFixed(1)
            : 0;

    return (
        <div
            style={{
                background: `url('/assets/images/bg-detail.png') center/cover no-repeat`,
                padding: 48,
                alignItems: "center",
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
                        icon={<ArrowLeftOutlined style={{ fontSize: 18 }} />}
                        onClick={() =>
                            access === "destination"
                                ? Inertia.visit(
                                      `/detail-destination/?id=${id}&type=${type}`
                                  )
                                : Inertia.visit(`/detail-event/?id=${id}`)
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
                        Detail Ulasan
                    </span>
                </Flex>
            </div>

            <div style={{ padding: "48px 64px" }}>
                <FormReviewSelect
                    review={reviews}
                    onFilter={({ sector, search }) => {
                        setSelectedSector(sector || "");
                        setSearchValue(search || "");
                    }}
                />

                <Row gutter={[48, 48]}>
                    <Col xs={24} lg={16}>
                        <Card style={{ borderRadius: 12 }}>
                            {filteredReviews.length === 0 ? (
                                <div
                                    style={{
                                        textAlign: "center",
                                        padding: "32px 0",
                                    }}
                                >
                                    <Typography.Title level={4}>
                                        Belum ada ulasan.
                                    </Typography.Title>
                                    <Typography.Paragraph
                                        style={{ color: "#666" }}
                                    >
                                        Jadilah pengulas pertama dan bantu
                                        pengunjung lainnya!
                                    </Typography.Paragraph>
                                </div>
                            ) : (
                                <>
                                    {filteredReviews.map((review, index) => (
                                        <div
                                            key={index}
                                            style={{ marginBottom: 24 }}
                                        >
                                            <div
                                                style={{
                                                    fontWeight: 600,
                                                    fontSize: 16,
                                                    marginBottom: 7,
                                                }}
                                            >
                                                {review.name}
                                            </div>
                                            <div
                                                style={{
                                                    fontSize: 14,
                                                    color: "#888",
                                                    marginBottom: 4,
                                                }}
                                            >
                                                <Rate
                                                    disabled
                                                    defaultValue={review.rating}
                                                    style={{ fontSize: 16 }}
                                                />
                                                <span style={{ marginLeft: 8 }}>
                                                    {review.relative_time}
                                                </span>
                                            </div>
                                            <Paragraph
                                                style={{
                                                    fontSize: 15,
                                                    marginBottom: 0,
                                                }}
                                            >
                                                {review.review}
                                            </Paragraph>
                                            <Divider />
                                        </div>
                                    ))}
                                    <Pagination
                                        current={1}
                                        total={filteredReviews.length}
                                        pageSize={5}
                                    />
                                </>
                            )}
                        </Card>
                    </Col>

                    <Col xs={24} lg={8}>
                        <Card style={{ borderRadius: 12 }}>
                            <Card
                                style={{
                                    border: "1px solid #f0f0f0",
                                    borderRadius: 12,
                                    padding: 12,
                                    marginBottom: 32,
                                    backgroundColor: "#f0f0f0",
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <div style={{ width: "50%" }}>
                                        {ratingStats.map((item) => (
                                            <div
                                                key={item.star}
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    marginBottom: 8,
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        width: 40,
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 4,
                                                    }}
                                                >
                                                    <span>{item.star}</span>
                                                    <StarFilled
                                                        style={{
                                                            color: "#FFC107",
                                                        }}
                                                    />
                                                </div>
                                                <Progress
                                                    percent={item.percent}
                                                    showInfo={false}
                                                    strokeColor="#176B5D"
                                                    trailColor="#f0f0f0"
                                                    style={{
                                                        flex: 1,
                                                        marginLeft: 8,
                                                    }}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <div
                                        style={{
                                            textAlign: "center",
                                            width: "50%",
                                        }}
                                    >
                                        <div
                                            style={{
                                                fontSize: 48,
                                                fontWeight: 700,
                                            }}
                                        >
                                            {averageRating}
                                        </div>
                                        <Rate
                                            disabled
                                            allowHalf
                                            defaultValue={parseFloat(
                                                averageRating
                                            )}
                                            style={{ fontSize: 20 }}
                                        />
                                        <div
                                            style={{
                                                fontSize: 14,
                                                fontWeight: 600,
                                                marginTop: 8,
                                            }}
                                        >
                                            {filteredReviews.length} Reviews
                                        </div>
                                    </div>
                                </div>
                            </Card>
                            <FormReview
                                onSubmit={handleFinish}
                                type={type}
                                reviewableId={id}
                            />
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
}
