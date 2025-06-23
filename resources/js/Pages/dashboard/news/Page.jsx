import NewsContent from "../../../components/content/news";
import Layout from "../Layout";

export default function News() {
    return <NewsContent />;
}

News.layout = (page) => <Layout children={page} />;
