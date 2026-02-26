/**
 * Proyecto: Macrayola
 * Desarrollado por: El Ingeniero de Software Libardo Lopez
 * Archivo: SobreMi.tsx
 */
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Heart, Sparkles, Target } from "lucide-react";
import heroImage from "@/assets/hero-crochet.jpg";

const SobreMi = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6 text-center animate-fade-in">
                Sobre Mí
              </h1>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="rounded-lg overflow-hidden shadow-soft animate-fade-in">
                  <img
                    src={heroImage}
                    alt="Clara trabajando en crochet"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-4 text-muted-foreground animate-fade-in">
                  <p className="text-lg">
                    ¡Hola! Soy <span className="text-foreground font-semibold">Clara</span>, la
                    artesana detrás de Macrayola.
                  </p>
                  <p>
                    Desde pequeña me fascinaba ver a mi abuela tejer. Esas tardes llenas de
                    historias y el sonido rítmico de las agujas despertaron en mí una pasión que se
                    ha convertido en mi forma de vida.
                  </p>
                  <p>
                    Hace más de 10 años comencé a experimentar con crochet y macramé, explorando
                    técnicas tradicionales y dándoles un giro contemporáneo. Cada pieza que creo
                    lleva un pedacito de esa calidez que recibí de mi abuela.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-3xl font-bold text-foreground mb-12 text-center">
                Mi Filosofía
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center space-y-4 p-6 rounded-lg bg-secondary/30 animate-fade-in">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <Heart className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-semibold">Hecho con Amor</h3>
                  <p className="text-muted-foreground text-sm">
                    Cada puntada lleva dedicación, tiempo y cariño. No hay dos piezas iguales.
                  </p>
                </div>

                <div
                  className="text-center space-y-4 p-6 rounded-lg bg-secondary/30 animate-fade-in"
                  style={{ animationDelay: "0.1s" }}
                >
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                    <Sparkles className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="font-display text-xl font-semibold">Sostenibilidad</h3>
                  <p className="text-muted-foreground text-sm">
                    Uso materiales naturales y de comercio justo. Creo en la moda lenta y
                    consciente.
                  </p>
                </div>

                <div
                  className="text-center space-y-4 p-6 rounded-lg bg-secondary/30 animate-fade-in"
                  style={{ animationDelay: "0.2s" }}
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <Target className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-semibold">Compartir Conocimiento</h3>
                  <p className="text-muted-foreground text-sm">
                    Enseñar estas técnicas me llena de alegría. Ver crecer a mis estudiantes es
                    maravilloso.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto space-y-6 text-muted-foreground">
              <h2 className="font-display text-3xl font-bold text-foreground mb-8">Mi Historia</h2>
              <p>
                Después de años trabajando en diseño gráfico, sentía que algo faltaba. Necesitaba
                crear con mis manos, tocar texturas, ver el resultado tangible de mi trabajo. Así
                nació Macrayola en 2018.
              </p>
              <p>
                Lo que comenzó como un hobby en mi tiempo libre se convirtió en mi vocación. Dejé
                mi trabajo de oficina y me dediqué por completo a tejer. Fue aterrador pero
                liberador.
              </p>
              <p>
                Hoy, además de crear piezas únicas, comparto mi conocimiento en talleres. Ver la
                cara de satisfacción de alguien que termina su primera pieza es indescriptible. Es
                como si estuviera pasando el legado de mi abuela a una nueva generación.
              </p>
              <p className="text-foreground font-semibold italic">
                Cada hilo, cada nudo, lleva una intención: crear belleza, calidez y conexión.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-8 shadow-card">
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                ¿Quieres Saber Más?
              </h2>
              <p className="text-muted-foreground mb-6">
                Estoy siempre disponible para responder preguntas, charlar sobre proyectos
                personalizados o simplemente compartir el amor por las manualidades.
              </p>
              <a
                href="/contacto"
                className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold transition-smooth hover:scale-105"
              >
                Contacta Conmigo
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SobreMi;
