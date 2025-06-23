import HomeDashboardContent from "../../../components/content/home-dashboard";
import Layout from "../Layout";

export default function HomeDashboard() {
    return <HomeDashboardContent />;
}

HomeDashboard.layout = (page) => <Layout children={page} />;
