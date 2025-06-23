import { Image, Layout, Menu } from "antd";
import { useEffect, useState } from "react";
import { SidebarMenu } from "../../../data/menu/side-bar";
import { router, usePage } from "@inertiajs/inertia-react";
import { SidebarMain } from "../../../data/main/sider-bar";
import { SidebarSetting } from "../../../data/setting/side-bar";

const { Sider } = Layout;

export const SideBar = ({ collapsed }) => {
    const sidebarMenu = SidebarMenu();
    const sidebarMain = SidebarMain();
    const sidebarSetting = SidebarSetting();

    const [selectActiveKey, setActiveKey] = useState("");
    const { url } = usePage().props;

    useEffect(() => {
        if (url) {
            const currentPath = url.split("?")[0];
            const allMenuItems = [
                ...sidebarMenu,
                ...sidebarMain,
                ...sidebarSetting,
            ];
            const matchedItem = allMenuItems
                .filter((item) =>
                    new RegExp(`^${item.key}(/.*)?$`).test(currentPath)
                )
                .sort((a, b) => b.key.length - a.key.length)[0];
            setActiveKey(matchedItem ? matchedItem.key : currentPath);
        }
    }, [url, sidebarMenu, sidebarMain, sidebarSetting]);

    return (
        <>
            {/* Logo Area */}
            <div
                style={{
                    height: 64,
                    margin: 16,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: collapsed ? "center" : "flex-start",
                    cursor: "pointer",
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    borderRadius: 8,
                    padding: 8,
                    transition: "all 0.3s ease",
                }}
                onClick={() => router.visit("/")}
            >
                <Image
                    src="/assets/images/logo.png"
                    alt="Logo"
                    width={collapsed ? 32 : 200}
                    height={collapsed ? 32 : 70}
                    preview={false}
                    style={{
                        transition: "all 0.3s ease",
                        objectFit: "contain",
                        marginLeft: collapsed ? 0 : 8,
                        marginBottom: "50px",
                    }}
                />
            </div>

            <Menu
                items={sidebarMain}
                selectedKeys={[selectActiveKey]}
                mode="inline"
                theme="dark"
            />

            <div style={{ textAlign: "center", color: "#FFFF" }}>
                <p>MENU</p>
            </div>

            <Menu
                items={sidebarMenu}
                selectedKeys={[selectActiveKey]}
                mode="inline"
                theme="dark"
            />

            <div style={{ textAlign: "center", color: "#FFFF" }}>
                <p>SETTING</p>
            </div>

            <Menu
                items={sidebarSetting}
                selectedKeys={[selectActiveKey]}
                mode="inline"
                theme="dark"
            />
        </>
    );
};
