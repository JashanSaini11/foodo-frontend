import Navbar from "@/components/home/NavBar";
import Footer from "@/components/home/Footer";

export default function UserLayout({ children }) {
    return (
        <>
            <Navbar />
            <main className="min-h-screen">
                {children}
            </main>
            <Footer />
        </>
    );
}