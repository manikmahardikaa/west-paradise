import VillageContent from "../../../components/content/village";
import Layout from "../Layout";

export default function Villages() {
    return <VillageContent />;
}

Villages.layout = (page) => <Layout children={page} />;
