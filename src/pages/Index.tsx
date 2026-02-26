import { Link } from "react-router-dom";
import { ArrowRight, Heart, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import heroImage from "@/assets/hero-crochet.jpg";
import productMacrame from "@/assets/product-macrame.jpg";
import productBasket from "@/assets/product-basket.jpg";
import productPlanter from "@/assets/product-planter.jpg";

const Index = () => {
  const featuredProducts = [
    {
      name: "Tapiz de Macramé",
      price: 180000,
      image: productMacrame,
      description: "Decoración de pared con diseño bohemio",
      materials: "Algodón 100%",
    },
    {
      name: "Cesta de Crochet",
      price: 120000,
      image: productBasket,
      description: "Organizador artesanal para tu hogar",
      materials: "Algodón reciclado",
    },
    {
      name: "Colgante para Plantas",
      price: 95000,
      image: productPlanter,
      description: "Dale vida a tus espacios con estilo",
      materials: "Cuerda de algodón",
    },
  ];

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
                Piezas artesanales para decorar y dar vida a tus espacios
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.name} {...product} />
              ))}
            </div>

            <div className="text-center">
              <Button asChild variant="outline" size="lg">
                <Link to="/tienda">
                  Ver Toda la Tienda
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

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
