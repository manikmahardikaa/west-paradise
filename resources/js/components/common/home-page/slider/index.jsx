import { usePage } from "@inertiajs/inertia-react";
import { Image } from "antd";
import Slider from "react-slick";

export default function SliderHomePage() {
    const { sliders } = usePage().props;

    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        arrows: true,
        autoplaySpeed: 4000,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <div
            style={{
                maxWidth: 1200,
                width: "100%",
                aspectRatio: "16/7", // ratio lebar:tinggi, contoh 16:7
                margin: "0 auto",
                borderRadius: "24px",
                overflow: "hidden",
                background: "#eee", // fallback warna
                boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
            }}
        >
            <Slider {...settings}>
                {sliders?.map((item) => (
                    <div key={item.id}>
                        <Image
                            src={item.image_url}
                            alt="Slider"
                            preview={false}
                            width="100%"
                            height="100%"
                            style={{
                                objectFit: "cover",
                                width: "100%",
                                height: "100%",
                            }}
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
}
