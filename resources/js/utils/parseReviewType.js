export const parseReviewType = (type) => {
    switch (type) {
        case "destinasi":
            return "Destinasi Wisata";
        case "restoran":
            return "Restoran";
        case "akomodasi":
            return "Akomodasi";
        case "desa-wisata":
            return "Desa Wisata";
        case "ekonomi-kreatif":
            return "Ekonomi Kreatif";
        case "fasilitas-kesehatan":
            return "Fasilitas Kesehatan";
        case "transportasi":
            return "Transportasi";
        default:
            return "Destinasi Wisata";
    }
};
