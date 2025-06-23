import TransportationContent from "../../../components/content/transportation";
import Layout from "../Layout";

export default function Transportations() {
    return <TransportationContent />;
}

Transportations.layout = (page) => <Layout children={page} />;
