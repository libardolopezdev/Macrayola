/**
 * Proyecto: Macrayola
 * Desarrollado por: El Ingeniero de Software Libardo Lopez
 * Archivo: Contacto.tsx
 */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Instagram, MessageCircle } from "lucide-react";
import { toast } from "sonner";

const contactSchema = z.object({
  name: z.string().min(2, "El nombre es requerido").max(100),
  email: z.string().email("Email inválido").max(255),
  phone: z.string().min(9, "Teléfono inválido").max(20).optional(),
  subject: z.string().min(3, "El asunto es requerido").max(200),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres").max(1000),
});

type ContactForm = z.infer<typeof contactSchema>;

const Contacto = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);

    const message = encodeURIComponent(
      `Hola Macrayola! Mi nombre es ${data.name}. \n` +
      `Asunto: ${data.subject}\n` +
      `Email: ${data.email}\n` +
      `Mensaje: ${data.message}`
    );

    window.open(`https://wa.me/573104019806?text=${message}`, '_blank');

    toast.success("¡Abriendo WhatsApp!", {
      description: "Se ha generado tu mensaje para enviarlo directamente.",
    });

    reset();
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 animate-fade-in">
              Contáctanos
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto animate-fade-in">
              ¿Tienes alguna pregunta o quieres hacer un pedido personalizado? Estamos aquí para
              ayudarte.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Contact Info */}
              <div className="space-y-8 animate-fade-in">
                <div>
                  <h2 className="font-display text-3xl font-bold text-foreground mb-6">
                    Información de Contacto
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    Nos encantaría saber de ti. Responderemos lo antes posible.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-4 bg-secondary/30 rounded-lg">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Email</h3>
                      <a
                        href="mailto:yolis2007@hotmail.es"
                        className="text-muted-foreground hover:text-primary transition-smooth"
                      >
                        yolis2007@hotmail.es
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-secondary/30 rounded-lg">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Teléfono</h3>
                      <a
                        href="https://wa.me/573104019806"
                        className="text-muted-foreground hover:text-primary transition-smooth"
                      >
                        +57 310 4019806
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-secondary/30 rounded-lg">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Ubicación</h3>
                      <p className="text-muted-foreground">Medellín, Colombia</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Trabajamos desde el corazón de Antioquia
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-secondary/30 rounded-lg">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">WhatsApp</h3>
                      <a
                        href="https://wa.me/573104019806"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-smooth"
                      >
                        Chatea con nosotros
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-secondary/30 rounded-lg">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Instagram className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Instagram</h3>
                      <a
                        href="https://instagram.com/macrayola"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-smooth"
                      >
                        @macrayola
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-6 rounded-lg">
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                    Horario de Atención
                  </h3>
                  <div className="space-y-2 text-muted-foreground text-sm">
                    <p>Lunes a Viernes: 10:00 - 18:00</p>
                    <p>Sábados: 10:00 - 14:00</p>
                    <p>Domingos: Cerrado</p>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="bg-card p-8 rounded-lg shadow-card space-y-6"
                >
                  <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                    Envíanos un Mensaje
                  </h2>

                  <div>
                    <Label htmlFor="name">Nombre Completo *</Label>
                    <Input
                      id="name"
                      {...register("name")}
                      placeholder="Tu nombre"
                      className="mt-1.5"
                    />
                    {errors.name && (
                      <p className="text-destructive text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email")}
                      placeholder="tu@email.com"
                      className="mt-1.5"
                    />
                    {errors.email && (
                      <p className="text-destructive text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="phone">Teléfono (opcional)</Label>
                    <Input
                      id="phone"
                      {...register("phone")}
                      placeholder="+34 600 000 000"
                      className="mt-1.5"
                    />
                    {errors.phone && (
                      <p className="text-destructive text-sm mt-1">{errors.phone.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="subject">Asunto *</Label>
                    <Input
                      id="subject"
                      {...register("subject")}
                      placeholder="¿En qué podemos ayudarte?"
                      className="mt-1.5"
                    />
                    {errors.subject && (
                      <p className="text-destructive text-sm mt-1">{errors.subject.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="message">Mensaje *</Label>
                    <Textarea
                      id="message"
                      {...register("message")}
                      placeholder="Cuéntanos más sobre tu consulta..."
                      className="mt-1.5"
                      rows={6}
                    />
                    {errors.message && (
                      <p className="text-destructive text-sm mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full transition-smooth hover:scale-105"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    * Campos obligatorios. Responderemos en un plazo máximo de 48 horas.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contacto;
