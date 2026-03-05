/**
 * Proyecto: Macrayola
 * Desarrollado por: El Ingeniero de Software Libardo Lopez
 * Archivo: Tienda.tsx
 */
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Product } from "@/types/product";
import { Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const Tienda = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState<{ url: string, title: string } | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(collection(db, "products"), orderBy("order", "asc"));
        const querySnapshot = await getDocs(q);
        const data: Product[] = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() } as Product);
        });
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Nuestra Tienda
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Cada pieza es única y hecha a mano. Pide directamente por WhatsApp y personaliza tu
              pedido.
            </p>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="flex flex-col items-center py-20">
              <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
              <p className="text-muted-foreground text-lg">Cargando nuestra colección...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20 bg-secondary/30 rounded-xl border border-dashed border-border">
              <p className="text-muted-foreground text-lg">Próximamente nuevos ingresos. ¡Vuelve pronto!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product, index) => (
                <div
                  key={product.id || index}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <ProductCard {...product} onPreview={(url, title) => setActiveVideo({ url, title })} />
                </div>
              ))}
            </div>
          )}

          {/* Info Box */}
          <div className="mt-16 bg-secondary/50 rounded-lg p-8 text-center">
            <h3 className="font-display text-2xl font-semibold mb-4">¿Buscas algo especial?</h3>
            <p className="text-muted-foreground mb-6">
              También realizamos pedidos personalizados. Contáctanos para crear la pieza perfecta
              para ti.
            </p>
            <a
              href="https://wa.me/573104019806?text=Hola!%20Me%20gustaría%20hacer%20un%20pedido%20personalizado"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold transition-smooth hover:scale-105"
            >
              Contactar por WhatsApp
            </a>
          </div>
        </div>

        {/* Video Preview Modal */}
        <Dialog open={!!activeVideo} onOpenChange={() => setActiveVideo(null)}>
          <DialogContent className="sm:max-w-4xl p-0 overflow-hidden bg-black">
            <DialogHeader className="p-4 bg-card">
              <DialogTitle className="font-display text-xl">{activeVideo?.title}</DialogTitle>
            </DialogHeader>
            <div className="relative">
              <AspectRatio ratio={16 / 9}>
                {activeVideo && (
                  <video
                    src={activeVideo.url}
                    controls
                    autoPlay
                    className="w-full h-full"
                  />
                )}
              </AspectRatio>
            </div>
          </DialogContent>
        </Dialog>
      </main>

      <Footer />
    </div>
  );
};

export default Tienda;
