/**
 * Proyecto: Macrayola
 * Desarrollado por: El Ingeniero de Software Libardo Lopez
 * Archivo: Tienda.tsx
 */
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import productMacrame from "@/assets/product-macrame.jpg";
import productBasket from "@/assets/product-basket.jpg";
import productPlanter from "@/assets/product-planter.jpg";

const Tienda = () => {
  const products = [
    {
      name: "Tapiz de Macramé Bohemio",
      price: 180000,
      image: productMacrame,
      description: "Decoración de pared con diseño bohemio elegante",
      materials: "Algodón 100%, madera natural",
    },
    {
      name: "Cesta de Crochet Grande",
      price: 140000,
      image: productBasket,
      description: "Organizador espacioso para mantas y juguetes",
      materials: "Algodón reciclado",
    },
    {
      name: "Colgante para Plantas",
      price: 65000,
      image: productPlanter,
      description: "Ideal para plantas colgantes y decoración verde",
      materials: "Cuerda de algodón resistente",
    },
    {
      name: "Tapiz de Macramé Minimalista",
      price: 150000,
      image: productMacrame,
      description: "Diseño geométrico moderno para cualquier espacio",
      materials: "Algodón 100%",
    },
    {
      name: "Cesta de Crochet Mediana",
      price: 95000,
      image: productBasket,
      description: "Perfecta para almacenamiento en baño o cocina",
      materials: "Algodón orgánico",
    },
    {
      name: "Set de Colgantes (3 unidades)",
      price: 175000,
      image: productPlanter,
      description: "Tres colgantes en diferentes tamaños",
      materials: "Cuerda de algodón",
    },
  ];

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div
                key={index}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard {...product} />
              </div>
            ))}
          </div>

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
      </main>

      <Footer />
    </div>
  );
};

export default Tienda;
