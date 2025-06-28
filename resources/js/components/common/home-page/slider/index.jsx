import { usePage } from "@inertiajs/inertia-react";
import { Image } from "antd";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    dots: true,
                },
            },
        ],
    };

    return (
        <div
            style={{
                maxWidth: 1200,
                width: "100%",
                margin: "0 auto",
                padding: "0 16px",
            }}
        >
            <div
                style={{
                    width: "100%",
                    aspectRatio: "16/7",
                    borderRadius: "24px",
                    overflow: "hidden",
                    background: "#eee",
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
                                    borderRadius: "0",
                                }}
                            />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}
