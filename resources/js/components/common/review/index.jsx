import { Rate, Progress, Typography, Divider, Button, Empty } from "antd";
import { StarFilled } from "@ant-design/icons";
import { Inertia } from "@inertiajs/inertia";
import translations from "../../../lang/lang";

const { Paragraph } = Typography;

export default function ReviewSection({ id, model, reviews, access, locale }) {
    console.log(reviews);

    const ratingStats = [5, 4, 3, 2, 1].map((star) => {
        const total = reviews.length;
        const count = reviews.filter((r) => r.rating === star).length;
        return {
            star,
            percent: total > 0 ? Math.round((count / total) * 100) : 0,
        };
    });

    const averageRating =
        reviews.length > 0
            ? (
                  reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
              ).toFixed(1)
            : 0;

    const t = translations[locale || "id"];

    return (
        <div style={{ padding: 24, borderRadius: 10 }}>
            <Typography.Title level={4} style={{ fontWeight: 700 }}>
                {" "}
                {t.label.ratingAndReview}
            </Typography.Title>

            <div
                style={{
                    display: "flex",
                    gap: 32,
                    alignItems: "center",
                    flexWrap: "wrap",
                    marginBottom: 24,
                    marginTop: 8,
                }}
            >
                {/* Kiri - Distribusi bintang */}
                <div style={{ minWidth: 200 }}>
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
                                <span style={{ fontSize: 16 }}>
                                    {item.star}
                                </span>
                                <StarFilled
                                    style={{ color: "#FFC107", fontSize: 16 }}
                                />
                            </div>
                            <Progress
                                percent={item.percent}
                                showInfo={false}
                                strokeColor="#176B5D"
                                style={{ flex: 1, marginLeft: 8 }}
                            />
                        </div>
                    ))}
                </div>

                {/* Kanan - Skor rata-rata */}
                <div
                    style={{
                        textAlign: "center",
                        fontSize: 48,
                        fontWeight: 700,
                    }}
                >
                    {averageRating}
                    <div>
                        <Rate
                            disabled
                            allowHalf
                            defaultValue={parseFloat(averageRating)}
                        />
                        <div style={{ fontSize: 14, marginTop: 4 }}>
                            {reviews.length} Review
                            {reviews.length !== 1 ? "s" : ""}
                        </div>
                    </div>
                </div>
            </div>

            <Divider />

            {/* Ulasan */}
            {reviews.length === 0 ? (
                <Empty
                    description={
                        <div>
                            <strong>{t.label.noReview}</strong>
                            <br />
                            {t.label.firstReview}
                        </div>
                    }
                />
            ) : (
                reviews.slice(0, 3).map((review, index) => (
                    <div key={index} style={{ marginBottom: 24 }}>
                        <div style={{ fontWeight: 600, marginBottom: 7 }}>
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
                            />{" "}
                            <span style={{ marginLeft: 8 }}>
                                {review.relative_time}
                            </span>
                        </div>
                        <Paragraph style={{ fontSize: 15, marginBottom: 0 }}>
                            {review.review}
                        </Paragraph>
                    </div>
                ))
            )}

            <Button
                block
                type="primary"
                style={{
                    backgroundColor: "#E81E4B",
                    borderColor: "#E81E4B",
                    fontWeight: 600,
                    marginTop: 15,
                }}
                onClick={() => {
                    Inertia.visit(
                        `/review/?id=${id}&type=${model}&access=${access}`
                    );
                }}
            >
                {t.label.allReview}
            </Button>
        </div>
    );
}
