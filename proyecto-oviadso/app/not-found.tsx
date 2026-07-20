import Footer from "@/components/layout/Footer";
import NavBar from "@/components/layout/NavBar";

export default function NotFound() {
    return (
        <>
        <NavBar/>
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">404 - Pagina no encontrada</h1>
            <p>Lo sentimos, la pagina que estas buscando no existe.</p>
        </main>
        <Footer />
        </>
    );
}