import Footer from "@/components/ui/shared/Footer";
import Navbar from "@/components/ui/shared/Navbar";
const CommonLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Navbar />
            <main className="min-h-screen bg-gray-100">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default CommonLayout;
