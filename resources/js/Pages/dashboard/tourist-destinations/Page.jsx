import React from "react";
import Layout from "../Layout";
import TouristDestinationContent from "../../../components/content/tourist-destination";

export default function TouristDestination() {
    return <TouristDestinationContent />;
}

TouristDestination.layout = (page) => <Layout children={page} />;
