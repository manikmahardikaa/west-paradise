import React from "react";
import Layout from "../Layout";
import CategoryContent from "../../../components/content/category";


export default function Category() {
    return <CategoryContent />;
}

Category.layout = (page) => <Layout children={page} />;
