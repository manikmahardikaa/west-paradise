const antdTheme = {
    cssVar: true,
    token: {
        fontSize: 16,
        colorPrimary: "#C62828", // Merah untuk item aktif
        colorLink: "#1677ff",
        colorLinkHover: "#69b1ff",
        colorText: "#000000", // teks default di sidebar putih
        colorTextSecondary: "#cccccc",
        colorBgLayout: "#f5f5f5",
        colorBgContainer: "#ffffff",
        borderRadius: 4,
        padding: 16,
    },
    components: {
        Layout: {
            headerHeight: 64,
            bodyBg: "#f5f5f5",
            siderBg: "#3e4f3f", // Hijau tua khas desain kamu
        },
        Menu: {
            itemBorderRadius: 8,
            itemSelectedColor: "#C62828", // teks merah saat aktif
            itemSelectedBg: "#ffffff", // background putih saat aktif
            itemColor: "#ffffff", // teks normal putih
            itemHoverBg: "#ffffff22", // hover ringan transparan
        },
        Button: {
            borderRadius: 6,
            colorPrimaryHover: "#40a9ff",
        },
        Table: {
            headerBg: "#fafafa",
            headerColor: "#1f1f1f",
            rowHoverBg: "#f0f5ff",
            borderColor: "#f0f0f0",
        },
        Input: {
            borderRadius: 6,
        },
        Card: {
            borderRadius: 10,
            padding: 24,
        },
    },
};

export default antdTheme;
