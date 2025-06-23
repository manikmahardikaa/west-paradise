import UserContent from "../../../components/content/user";
import Layout from "../Layout";

export default function User() {
    return <UserContent />;
}

User.layout = page => <Layout children={page} />;