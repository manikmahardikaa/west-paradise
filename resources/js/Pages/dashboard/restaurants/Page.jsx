import RestaurantContent from "../../../components/content/restaurant";
import Layout from "../Layout";

export default function Restaurant() {
    return <RestaurantContent />;
}

Restaurant.layout = (page) => <Layout children={page} />;
