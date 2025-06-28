import HomePageMenuSection from "@/components/common/home-page/menu";
import SliderHomePage from "@/components/common/home-page/slider";
import HomeLayout from "@/components/container/home-layout";
import CardHomePage from "../../common/home-page/card";
import HeroSection from "../../common/hero-section";
import BackgroundHomePage from "../background-home-page";
import { usePage } from "@inertiajs/inertia-react";

export default function HomePageContent() {
    const currentLang =
        new URLSearchParams(window.location.search).get("lang") || "id";

    const { locale } = usePage().props;
    return (
        <HomeLayout locale={locale}>
            <BackgroundHomePage style={{ height: 100 }}>
                <div style={{ width: "100%", maxWidth: 1200 }}>
                    <SliderHomePage />
                    <div style={{ marginTop: 42 }}>
                        <HomePageMenuSection
                            lang={currentLang}
                            locale={locale}
                        />
                    </div>
                </div>
            </BackgroundHomePage>
            <div style={{ marginTop: 50 }}>
                <HeroSection locale={locale} />
            </div>
            <div style={{ marginTop: 50 }}>
                <CardHomePage />
            </div>
        </HomeLayout>
    );
}
