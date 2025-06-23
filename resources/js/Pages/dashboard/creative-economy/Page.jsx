import CreativeEconomyContent from "../../../components/content/creative-economy";
import Layout from "../Layout";

export default function CreativeEconomy() {
    return <CreativeEconomyContent />;
}
CreativeEconomy.layout = (page) => <Layout children={page} />;
