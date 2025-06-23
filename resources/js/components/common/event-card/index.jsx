import { CalendarOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import "dayjs/locale/id";
import "dayjs/locale/en";
import translations from "../../../lang/lang";

export default function EventCard({ events, locale = "id" }) {
    dayjs.locale(locale);

    const currentYear = dayjs().year();
    const t = translations[locale];

    const filteredEvents = events.filter((event) =>
        event.start_date
            ? dayjs(event.start_date).year() === currentYear
            : event.is_uncertain
    );

    const groupedByMonth = filteredEvents.reduce((acc, event) => {
        const monthIndex = event.is_uncertain
            ? "Tanggal Belum Pasti"
            : dayjs(event.start_date).month(); // 0-11

        if (!acc[monthIndex]) acc[monthIndex] = [];
        acc[monthIndex].push(event);
        return acc;
    }, {});

    return (
        <div
            style={{
                display: "flex",
                gap: 16,
                overflowX: "auto",
                paddingBottom: 8,
                scrollbarWidth: "thin",
            }}
        >
            {Array.from({ length: 12 }).map((_, index) => {
                const monthName = dayjs()
                    .locale(locale)
                    .month(index)
                    .format("MMMM");

                return (
                    <div
                        key={index}
                        style={{
                            minWidth: 280,
                            flexShrink: 0,
                            borderRadius: 12,
                            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                            overflow: "hidden",
                            background: "#fff",
                            fontFamily: "sans-serif",
                            border: "1px solid #eee",
                        }}
                    >
                        <div
                            style={{
                                backgroundColor: "#4b8063",
                                color: "white",
                                padding: "12px 16px",
                                fontWeight: 600,
                            }}
                        >
                            {monthName}
                        </div>

                        <div style={{ padding: 16 }}>
                            {groupedByMonth[index] ? (
                                Object.entries(
                                    groupedByMonth[index].reduce(
                                        (acc, event) => {
                                            const group = event.is_uncertain 
                                                ? "Tanggal Belum Pasti"
                                                : dayjs(event.start_date)
                                                      .locale(locale)
                                                      .format(
                                                          "dddd, D MMMM YYYY"
                                                      );
                                            if (!acc[group]) acc[group] = [];
                                            acc[group].push(event);
                                            return acc;
                                        },
                                        {}
                                    )
                                ).map(([label, list], idx) => (
                                    <div key={idx} style={{ marginBottom: 12 }}>
                                        <div
                                            style={{
                                                fontWeight: 600,
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 8,
                                                marginBottom: 4,
                                            }}
                                        >
                                            <CalendarOutlined />
                                            {label}
                                        </div>
                                        <ul
                                            style={{
                                                paddingLeft: 24,
                                                margin: 0,
                                            }}
                                        >
                                            {list.map((event) => (
                                                <li key={event.id}>
                                                    {event.name}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))
                            ) : (
                                <div
                                    style={{
                                        color: "#555",
                                        textAlign: "center",
                                    }}
                                >
                                    {t.cardHomePage.noEvent}
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
