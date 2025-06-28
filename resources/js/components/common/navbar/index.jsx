import { Menu, Row, Col, Flex, Drawer, Button, Grid, Dropdown } from "antd";
import { useState, useEffect } from "react";
import { usePage } from "@inertiajs/inertia-react";
import { DownOutlined } from "@ant-design/icons";
import { Inertia } from "@inertiajs/inertia";
import { NavbarMenu } from "../../../data/navbar/menu";

export default function NavBar() {
    const { url, locale } = usePage().props;
    const [selectedKey, setSelectedKey] = useState("/");
    const screens = Grid.useBreakpoint();
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        if (url) {
            const cleanPath = url.split("?")[0];

            const matchedItem = NavbarMenu().find((item) => {
                if (
                    cleanPath.startsWith("/detail-destination") &&
                    item.key === "/destination"
                )
                    return true;

                if (
                    cleanPath.startsWith("/detail-news") &&
                    item.key === "/news"
                )
                    return true;

                if (
                    cleanPath.startsWith("/detail-event") &&
                    item.key === "/event"
                )
                    return true;

                // exact match or special case for root path
                return item.key === cleanPath;
            });

            if (matchedItem) {
                setSelectedKey(matchedItem.key);
            }
        }
    }, [url]);

    const handleChangeLanguage = (lang) => {
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.set("lang", lang);
        Inertia.visit(currentUrl.toString(), {
            preserveScroll: true,
            preserveState: true,
        });
    };

    const langMenu = {
        items: [
            {
                key: "id",
                label: (
                    <div onClick={() => handleChangeLanguage("id")}>
                        🇮🇩 Bahasa Indonesia
                    </div>
                ),
            },
            {
                key: "en",
                label: (
                    <div onClick={() => handleChangeLanguage("en")}>
                        🇺🇸 English
                    </div>
                ),
            },
        ],
    };

    return (
        <>
            <Row
                align="middle"
                justify="center"
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1000,
                    background:
                        "linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0))",
                    height: "80px",
                    padding: "0 24px",
                    borderBottom: "none",
                    position: "fixed",
                }}
            >
                <Flex
                    justify="space-between"
                    align="middle"
                    style={{ width: "100%" }}
                >
                    <Col>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 30,
                            }}
                        >
                            <img
                                src="/assets/images/wonderful.png"
                                alt="wonderful"
                                style={{ height: 50 }}
                            />
                            <img
                                src="/assets/images/logo.png"
                                alt="jembrana"
                                style={{ height: 50 }}
                            />
                        </div>
                    </Col>
                    <Col
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 20,
                        }}
                    >
                        {screens.md ? (
                            <Menu
                                key={locale}
                                mode="horizontal"
                                theme="dark"
                                selectedKeys={[selectedKey]}
                                style={{
                                    backgroundColor: "transparent",
                                    borderBottom: "none",
                                    fontWeight: "500",
                                    minWidth: 550,
                                }}
                                items={NavbarMenu(locale).map((item) => ({
                                    ...item,
                                    className:
                                        selectedKey === item.key
                                            ? "ant-menu-item-selected"
                                            : "",
                                    style:
                                        selectedKey === item.key
                                            ? {
                                                  backgroundColor: "#f51b4c",
                                                  color: "white",
                                                  borderRadius: 40,
                                                  paddingInline: 20,
                                              }
                                            : { color: "white" },
                                }))}
                            />
                        ) : (
                            <Button
                                type="text"
                                icon={
                                    <span
                                        style={{ fontSize: 24, color: "white" }}
                                    >
                                        ☰
                                    </span>
                                }
                                onClick={() => setMobileOpen(true)}
                            />
                        )}

                        {/* LANGUAGE DROPDOWN */}
                        <Dropdown menu={langMenu} trigger={["click"]}>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 6,
                                    cursor: "pointer",
                                }}
                            >
                                <img
                                    src={`/assets/images/${locale}-circle.png`} // id-circle.png / en-circle.png
                                    alt={locale}
                                    style={{
                                        width: 28,
                                        height: 28,
                                        borderRadius: "50%",
                                    }}
                                />
                                <DownOutlined
                                    style={{ color: "white", fontSize: 14 }}
                                />
                            </div>
                        </Dropdown>
                    </Col>
                </Flex>
            </Row>

            <Drawer
                title="Menu"
                placement="right"
                onClose={() => setMobileOpen(false)}
                open={mobileOpen}
            >
                <Menu
                    mode="vertical"
                    selectedKeys={[selectedKey]}
                    onClick={() => setMobileOpen(false)}
                    style={{
                        color: "#333", // warna teks default untuk semua item (tidak terpilih)
                        fontWeight: 500,
                    }}
                    items={NavbarMenu(locale).map((item) => ({
                        ...item,
                        style:
                            selectedKey === item.key
                                ? {
                                      color: "#f51b4c", // teks saat aktif
                                      fontWeight: "bold",
                                  }
                                : {
                                      color: "#333", // teks saat tidak aktif
                                  },
                    }))}
                />
            </Drawer>
        </>
    );
}
