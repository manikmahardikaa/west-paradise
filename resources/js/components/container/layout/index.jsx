import { Fragment, useEffect, useState } from "react";
import { Layout, notification } from "antd";
import { SideBar } from "../sider";
import MainHeader from "../header";
import { usePage } from "@inertiajs/inertia-react";

const { Content, Sider } = Layout;

export default function MainLayout({ children, username }) {
    const { success } = usePage().props;

    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        if (success) {
            notification.success({
                message: "Login Berhasil",
                description: success,
            });
        }
    }, [success]);

    return (
        <Fragment>
            <Layout hasSider style={{ minHeight: "100vh" }}>
                {/* Sidebar with collapse support */}
                <Sider
                    width={220}
                    collapsible
                    collapsed={collapsed}
                    onCollapse={(value) => setCollapsed(value)}
                    style={{
                        overflow: "auto",
                        height: "100vh",
                        position: "fixed",
                        left: 0,
                        top: 0,
                        bottom: 0,
                        backgroundColor: "#001529",
                    }}
                >
                    <SideBar collapsed={collapsed} />
                </Sider>

                {/* Main Content Layout */}
                <Layout
                    style={{
                        marginLeft: collapsed ? 80 : 220,
                        transition: "all 0.2s ease-in-out",
                        minHeight: "100vh",
                    }}
                >
                    <MainHeader username={username} />
                    <Content
                        style={{
                            margin: "24px 16px",
                            padding: 12,
                            backgroundColor: "#fff",
                        }}
                    >
                        {children}
                    </Content>
                </Layout>
            </Layout>
        </Fragment>
    );
}
