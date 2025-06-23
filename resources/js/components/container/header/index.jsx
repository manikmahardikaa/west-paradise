import { Avatar, Dropdown, Layout } from "antd";
import { LogoutOutlined } from "@ant-design/icons";

const { Header } = Layout;

export default function MainHeader({ username }) {
    const dropdownMenu = [
        {
            key: "logout",
            label: "Logout",
            icon: <LogoutOutlined />,
            onClick: () => {
                // Tambahkan logika logout di sini, contoh:
                console.log("Logout clicked");
                // atau panggil router.visit('/logout')
            },
        },
    ];

    return (
        <Header
            style={{
                height: 70,
                backgroundColor: "#ffffff",
                padding: 0,
                boxShadow: "0 1px 4px rgba(0, 21, 41, 0.08)",
            }}
        >
            <div
                style={{
                    height: "100%",
                    width: "100%",
                    padding: "0 40px",
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                }}
            >
                <Dropdown menu={{ items: dropdownMenu }} trigger={["click"]}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            cursor: "pointer",
                        }}
                    >
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", marginRight: 10, lineHeight: 1.8 }}>
                            <span
                                style={{
                                    fontWeight: 500,
                                    color: "#333",
                                    fontSize: 16,
                                }}
                            >
                                {username}
                            </span>
                            <span
                                style={{
                                    fontSize: 12,
                                    color: "#888",
                                }}
                            >
                                Admin
                            </span>
                        </div>
                        <Avatar src="/images/icon.png" size="large" />
                    </div>
                </Dropdown>
            </div>
        </Header>
    );
}
