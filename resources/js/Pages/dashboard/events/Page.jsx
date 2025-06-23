import EventContent from "../../../components/content/event";
import Layout from "../Layout";

export default function Event() {
    return <EventContent />;
}

Event.layout = (page) => (<Layout children={page} />);
