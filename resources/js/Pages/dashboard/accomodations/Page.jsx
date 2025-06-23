import AccomodationContent from "../../../components/content/accomodation";
import Layout from "../Layout";

export default function Accomodation() {
    return <AccomodationContent />;
}

Accomodation.layout = (page) => <Layout children={page} />;
