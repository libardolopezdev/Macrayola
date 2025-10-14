import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Package, RefreshCw, Shield, Truck } from "lucide-react";

const Politicas = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 animate-fade-in">
              Políticas de Envío y Devoluciones
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto animate-fade-in">
              Información importante sobre nuestros procesos de envío, devoluciones y garantía
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-12">
              {/* Shipping */}
              <div className="bg-card p-8 rounded-lg shadow-card animate-fade-in">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <Truck className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="font-display text-3xl font-bold text-foreground">
                    Envíos y Entregas
                  </h2>
                </div>

                <div className="space-y-4 text-muted-foreground">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Zonas de Envío</h3>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>España Península: 5-7 días laborables</li>
                      <li>Islas Baleares y Canarias: 7-10 días laborables</li>
                      <li>Europa: 10-15 días laborables</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Costos de Envío</h3>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>España Península: 4,95€ (GRATIS en pedidos superiores a 50€)</li>
                      <li>Islas Baleares y Canarias: 8,95€</li>
                      <li>Europa: Consultar al realizar el pedido</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Tiempo de Preparación</h3>
                    <p>
                      Como todas nuestras piezas son hechas a mano, el tiempo de preparación es de
                      2-5 días laborables antes del envío. Te notificaremos cuando tu pedido esté
                      listo para enviar.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Seguimiento</h3>
                    <p>
                      Todos los envíos incluyen número de seguimiento. Te enviaremos un email con
                      la información de tracking una vez que el paquete sea despachado.
                    </p>
                  </div>
                </div>
              </div>

              {/* Returns */}
              <div
                className="bg-card p-8 rounded-lg shadow-card animate-fade-in"
                style={{ animationDelay: "0.1s" }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                    <RefreshCw className="h-8 w-8 text-accent" />
                  </div>
                  <h2 className="font-display text-3xl font-bold text-foreground">Devoluciones</h2>
                </div>

                <div className="space-y-4 text-muted-foreground">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Plazo de Devolución</h3>
                    <p>
                      Tienes 14 días naturales desde la recepción del pedido para solicitar una
                      devolución, siempre que el producto se encuentre en perfectas condiciones y
                      sin usar.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Proceso</h3>
                    <ol className="list-decimal list-inside space-y-2 ml-4">
                      <li>Contacta con nosotros a través de email o WhatsApp</li>
                      <li>Envía el producto en su embalaje original</li>
                      <li>Procesaremos el reembolso en 5-7 días laborables tras recibir el artículo</li>
                    </ol>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Gastos de Devolución</h3>
                    <p>
                      Los gastos de devolución corren por cuenta del cliente, excepto en caso de
                      producto defectuoso o error en el envío.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Productos No Retornables</h3>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Piezas personalizadas o hechas bajo pedido</li>
                      <li>Productos que muestren signos de uso</li>
                      <li>Artículos sin etiquetas o embalaje original</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Packaging */}
              <div
                className="bg-card p-8 rounded-lg shadow-card animate-fade-in"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <Package className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="font-display text-3xl font-bold text-foreground">Embalaje</h2>
                </div>

                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Todos nuestros productos se envían cuidadosamente embalados para garantizar que
                    lleguen en perfectas condiciones. Utilizamos materiales reciclables y
                    sostenibles siempre que es posible.
                  </p>
                  <p>
                    Cada pieza incluye una tarjeta con instrucciones de cuidado y una nota de
                    agradecimiento personalizada.
                  </p>
                </div>
              </div>

              {/* Guarantee */}
              <div
                className="bg-card p-8 rounded-lg shadow-card animate-fade-in"
                style={{ animationDelay: "0.3s" }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                    <Shield className="h-8 w-8 text-accent" />
                  </div>
                  <h2 className="font-display text-3xl font-bold text-foreground">
                    Garantía de Calidad
                  </h2>
                </div>

                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Todas nuestras piezas están hechas a mano con los mejores materiales. Si
                    encuentras algún defecto de fabricación, contáctanos inmediatamente y
                    resolveremos el problema sin costo adicional.
                  </p>
                  <p>
                    Nuestra garantía cubre defectos de fabricación durante los primeros 30 días
                    desde la recepción del producto.
                  </p>
                </div>
              </div>

              {/* Contact */}
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-8 rounded-lg text-center">
                <h3 className="font-display text-2xl font-semibold text-foreground mb-4">
                  ¿Tienes Dudas?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Si tienes alguna pregunta sobre nuestras políticas, no dudes en contactarnos.
                </p>
                <a
                  href="/contacto"
                  className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold transition-smooth hover:scale-105"
                >
                  Ir a Contacto
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Politicas;
