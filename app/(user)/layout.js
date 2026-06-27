import Navbar from "@/components/user/NavBar";
import Footer from "@/components/user/Footer";

export default function UserLayout({ children }) {
    return (
        <>
            <Navbar />
            <main className="min-h-screen pt-[81px]">
                {children}
            </main>
            <Footer />
        </>
    );
}