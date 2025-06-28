export default function BackgroundHomePage({ children }) {
    return (
        <div
            style={{
                backgroundImage: "url('/assets/images/bg-homepage.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                width: "100%",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "100px 16px 80px", // top padding 100, horizontal 16px for mobile safety, bottom 80
                boxSizing: "border-box",
            }}
        >
            {children}
        </div>
    );
}
