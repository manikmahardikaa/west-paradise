import SliderContent from "../../../components/content/slider";
import Layout from "../Layout";

export default function Sliders() {
    return <SliderContent />;
}

Sliders.layout = (page) => <Layout children={page} />;
