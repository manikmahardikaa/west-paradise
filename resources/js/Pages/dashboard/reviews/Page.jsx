import ReviewContentDashboard from "../../../components/content/review-dashboard";
import Layout from "../Layout";

export default function ReviewDashboard() {
    return <ReviewContentDashboard />;
}

ReviewDashboard.layout = (page) => <Layout children={page} />;