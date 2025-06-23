import React from "react";
import { Layout } from "antd";
import NavBar from "../../common/navBAR";
import CustomFooter from "../../common/footer";

const { Content } = Layout;
export default function HomeLayout({ children , locale}) {
    return (
        <Layout
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#fff",
            }}
        >
            <NavBar />
            <Content style={{ background: "#FFFF" }}>{children}</Content>
            <CustomFooter locale={locale} />
        </Layout>
    );
}
