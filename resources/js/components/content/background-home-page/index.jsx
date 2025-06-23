export default function BackgroundHomePage({ children}) {
    return (
        <div
            style={{
                backgroundImage: "url('/assets/images/bg-homepage.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                width: "100%",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                paddingTop: 100,
                paddingBottom: 80,
            }}
        >
            {children}
        </div>
    );
}
