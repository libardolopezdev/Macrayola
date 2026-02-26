/**
 * Proyecto: Macrayola
 * Desarrollado por: El Ingeniero de Software Libardo Lopez
 * Archivo: Galeria.tsx
 */
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import productMacrame from "@/assets/product-macrame.jpg";
import productBasket from "@/assets/product-basket.jpg";
import productPlanter from "@/assets/product-planter.jpg";
import heroImage from "@/assets/hero-crochet.jpg";

const Galeria = () => {
  const galleryItems = [
    { image: productMacrame, title: "Tapiz de Macramé", category: "Macramé" },
    { image: productBasket, title: "Cesta Artesanal", category: "Crochet" },
    { image: productPlanter, title: "Colgante para Plantas", category: "Macramé" },
    { image: heroImage, title: "Proceso Creativo", category: "Detrás de Cámaras" },
    { image: productMacrame, title: "Decoración Bohemia", category: "Macramé" },
    { image: productBasket, title: "Organizadores", category: "Crochet" },
    { image: productPlanter, title: "Verde en Casa", category: "Macramé" },
    { image: heroImage, title: "Trabajo Artesanal", category: "Detrás de Cámaras" },
    { image: productMacrame, title: "Arte en Nudos", category: "Macramé" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 animate-fade-in">
              Galería de Trabajos
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto animate-fade-in">
              Explora nuestras creaciones artesanales. Cada pieza cuenta una historia tejida con
              dedicación.
            </p>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryItems.map((item, index) => (
                <div
                  key={index}
                  className="group relative aspect-square overflow-hidden rounded-lg shadow-card hover:shadow-soft transition-smooth cursor-pointer animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-smooth group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent opacity-0 group-hover:opacity-100 transition-smooth flex items-end p-6">
                    <div className="text-white">
                      <p className="text-sm font-semibold mb-1">{item.category}</p>
                      <h3 className="font-display text-xl font-bold">{item.title}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center bg-card rounded-lg p-8 shadow-card">
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                ¿Te Gustaría Ver Más?
              </h2>
              <p className="text-muted-foreground mb-6">
                Síguenos en Instagram para ver nuestros trabajos más recientes, tutoriales y
                promociones especiales.
              </p>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold transition-smooth hover:scale-105"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                Seguir en Instagram
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Galeria;
