/**
 * Proyecto: Macrayola
 * Desarrollado por: El Ingeniero de Software Libardo Lopez
 * Archivo: Index.tsx
 */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Heart, Sparkles, Users, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import heroImage from "@/assets/hero-crochet.jpg";
import Logo from "@/components/Logo";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Product } from "@/types/product";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const Index = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState<{ url: string, title: string } | null>(null);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const q = query(collection(db, "products"), orderBy("order", "asc"), limit(3));
        const querySnapshot = await getDocs(q);
        const data: Product[] = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() } as Product);
        });
        setFeaturedProducts(data);
      } catch (error) {
        console.error("Error fetching featured products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const testimonials = [
    {
      name: "María García",
      text: "Las piezas son hermosas y de excelente calidad. ¡Totalmente recomendado!",
    },
    {
      name: "Laura Martínez",
      text: "El curso de crochet superó mis expectativas. Clara explicó todo paso a paso.",
    },
    {
      name: "Ana Rodríguez",
      text: "Compré varios tapices y han transformado mi salón. Arte hecho con amor.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[600px] md:h-[700px] overflow-hidden gradient-hero">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImage})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-background/95 to-background/60" />
          </div>

          <div className="relative container mx-auto px-4 h-full flex items-center">
            <div className="max-w-2xl animate-fade-in">
              <div className="mb-6 inline-block bg-background/80 backdrop-blur-sm p-3 rounded-full shadow-lg border border-primary/20">
                <Logo showText={false} imgClassName="h-24 w-24 md:h-32 md:w-32" />
              </div>
              <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6">
                Hecho a mano con cariño
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                Descubre piezas únicas en crochet y macramé que darán calidez a tu hogar.
                Aprende el arte del tejido en nuestros cursos en Medellín o de forma virtual.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="transition-smooth hover:scale-105">
                  <Link to="/tienda">
                    Ver Tienda
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="transition-smooth hover:scale-105"
                >
                  <Link to="/cursos">Explorar Cursos</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center space-y-3 p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold">Hecho con Amor</h3>
                <p className="text-muted-foreground">
                  Cada pieza es única, tejida a mano con dedicación y cuidado.
                </p>
              </div>

              <div className="text-center space-y-3 p-6">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                  <Sparkles className="h-8 w-8 text-accent" />
                </div>
                <h3 className="font-display text-xl font-semibold">Materiales Naturales</h3>
                <p className="text-muted-foreground">
                  Usamos algodón 100% y fibras naturales de la mejor calidad.
                </p>
              </div>

              <div className="text-center space-y-3 p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold">Cursos Presenciales y Virtuales</h3>
                <p className="text-muted-foreground">
                  Aprende las técnicas de crochet y macramé en grupos pequeños o a tu ritmo.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Productos Destacados
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Las piezas más queridas por nuestros clientes
              </p>
            </div>

            {loading ? (
              <div className="flex flex-col items-center py-12">
                <Loader2 className="h-10 w-10 animate-spin text-primary mb-2" />
                <p className="text-muted-foreground">Cargando destacados...</p>
              </div>
            ) : featuredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Próximamente nuevos ingresos.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                {featuredProducts.map((product) => (
                  <ProductCard key={product.id} {...product} onPreview={(url, title) => setActiveVideo({ url, title })} />
                ))}
              </div>
            )}

            <div className="text-center mt-8">
              <Button asChild variant="outline" size="lg">
                <Link to="/tienda">
                  Ver Toda la Tienda
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

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

        {/* Testimonials */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Lo Que Dicen Nuestras Clientas
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-card p-6 rounded-lg shadow-card animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <p className="text-muted-foreground italic mb-4">"{testimonial.text}"</p>
                  <p className="font-semibold text-foreground">— {testimonial.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 md:p-12 text-center shadow-soft">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                ¿Lista para Aprender a Tejer?
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                Reserva tu cupo en nuestros próximos cursos de crochet y macramé. Plazas
                limitadas.
              </p>
              <Button asChild size="lg" className="transition-smooth hover:scale-105">
                <Link to="/cursos">Ver Cursos Disponibles</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
