import { Card, Col, Row, Select } from "antd";
import { HomeFilled } from "@ant-design/icons";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { useState } from "react";
import { usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import dayjs from "dayjs";

const { Option } = Select;

export default function HomeDashboardContent() {
    const {
        homeView,
        destinationView,
        searchLogDestination,
        searchLogLocation,
        year: defaultYear,
        month: defaultMonth,
        searchLogDestinatioPerType,
    } = usePage().props;

    console.log("searchLogDestinationPerType", searchLogDestinatioPerType);

    const [year, setYear] = useState(defaultYear);
    const [month, setMonth] = useState(defaultMonth);

    const typeLabels = {
        destinasi: "Destinasi Wisata",
        "desa-wisata": "Desa Wisata",
        restoran: "Restoran",
        "ekonomi-kreatif": "Ekonomi Kreatif",
        akomodasi: "Akomodasi",
        transportasi: "Transportasi",
        "fasilitas-kesehatan": "Fasilitas Kesehatan",
    };

    const chartData = Object.entries(searchLogDestinatioPerType || {}).map(
        ([key, value]) => ({
            name: typeLabels[key] || key,
            views: value,
        })
    );

    const currentYear = dayjs().year();
    const years = Array.from(
        { length: currentYear - 2022 + 1 },
        (_, i) => currentYear - i
    );

    const summaryCards = [
        {
            title: "Beranda",
            value: homeView,
            icon: <HomeFilled />,
            color: "#f51b4c",
        },
        {
            title: "Cari",
            value: searchLogDestination,
            icon: <HomeFilled />,
            color: "#5C7AEA",
        },
        {
            title: "Cari Lokasi",
            value: searchLogLocation,
            icon: <HomeFilled />,
            color: "#f6a500",
        },
        {
            title: "Lihat Destinasi",
            value: destinationView,
            icon: <HomeFilled />,
            color: "#9C5DEB",
        },
    ];

    const handleFilterChange = (newYear, newMonth) => {
        Inertia.visit(
            "/dashboard/home?year=" + newYear + "&month=" + newMonth,
            "get",
            {
                method: "get",
                data: {
                    year: newYear,
                    month: newMonth,
                },
                preserveScroll: true,
                replace: true,
            }
        );
    };

    return (
        <div style={{ padding: 24 }}>
            <h2 style={{ marginBottom: 24, fontWeight: 600 }}>Dashboard</h2>

            <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
                {summaryCards.map((item, i) => (
                    <Col xs={24} sm={12} md={6} key={i}>
                        <Card
                            bodyStyle={{
                                display: "flex",
                                alignItems: "center",
                                gap: 16,
                            }}
                            style={{
                                borderRadius: 12,
                                backgroundColor: "#f9f9f9",
                            }}
                        >
                            <div
                                style={{
                                    width: 52,
                                    height: 52,
                                    borderRadius: "50%",
                                    backgroundColor: item.color,
                                    color: "white",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                {item.icon}
                            </div>
                            <div>
                                <div style={{ fontWeight: 600 }}>
                                    {item.title}
                                </div>
                                <div style={{ fontSize: 20, fontWeight: 700 }}>
                                    {item.value} dilihat
                                </div>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Card style={{ borderRadius: 12 }}>
                <h3 style={{ marginBottom: 24, fontWeight: 600 }}>
                    Statistik Kunjungan
                </h3>
                <Row gutter={16} style={{ marginBottom: 24 }}>
                    <Col span={4}>
                        <Select
                            value={year}
                            onChange={(val) => {
                                setYear(val);
                            }}
                            style={{ width: "100%" }}
                        >
                            {years.map((y) => (
                                <Option key={y} value={y.toString()}>
                                    {y}
                                </Option>
                            ))}
                        </Select>
                    </Col>
                    <Col span={4}>
                        <Select
                            value={month}
                            onChange={(val) => {
                                setMonth(val);
                                handleFilterChange(year, val);
                            }}
                            style={{ width: "100%" }}
                        >
                            {[
                                "Januari",
                                "Februari",
                                "Maret",
                                "April",
                                "Mei",
                                "Juni",
                                "Juli",
                                "Agustus",
                                "September",
                                "Oktober",
                                "November",
                                "Desember",
                            ].map((m) => (
                                <Option key={m} value={m}>
                                    {m}
                                </Option>
                            ))}
                        </Select>
                    </Col>
                </Row>

                <ResponsiveContainer width="100%" height={300}>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData}>
                            <XAxis dataKey="name" />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Bar
                                dataKey="views"
                                fill="#6c9c77"
                                radius={[6, 6, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </ResponsiveContainer>
            </Card>
        </div>
    );
}
