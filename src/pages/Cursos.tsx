import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CourseCard from "@/components/CourseCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import heroImage from "@/assets/hero-crochet.jpg";

const reservationSchema = z.object({
  name: z.string().min(2, "El nombre es requerido").max(100),
  email: z.string().email("Email inválido").max(255),
  phone: z.string().min(9, "Teléfono inválido").max(20),
  course: z.string().min(1, "Selecciona un curso"),
  attendees: z.string().min(1, "Indica el número de asistentes"),
  message: z.string().max(500).optional(),
});

type ReservationForm = z.infer<typeof reservationSchema>;

const Cursos = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeVideo, setActiveVideo] = useState<{ url: string, title: string } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ReservationForm>({
    resolver: zodResolver(reservationSchema),
  });

  const courses = [
    {
      title: "Crochet para Principiantes",
      description: "Aprende los puntos básicos y crea tu primera pieza",
      date: "15 de Enero, 2025",
      duration: "3 horas (10:00 - 13:00)",
      maxStudents: 8,
      price: 150000,
      image: heroImage,
      type: 'presencial' as const,
    },
    {
      title: "Macramé Intermedio",
      description: "Técnicas avanzadas de nudos y patrones decorativos",
      date: "22 de Enero, 2025",
      duration: "4 horas (10:00 - 14:00)",
      maxStudents: 6,
      price: 180000,
      image: heroImage,
      type: 'presencial' as const,
    },
    {
      title: "Cesta de Crochet",
      description: "Crea una cesta decorativa paso a paso",
      date: "29 de Enero, 2025",
      duration: "5 horas (10:00 - 15:00)",
      maxStudents: 8,
      price: 200000,
      image: heroImage,
      type: 'presencial' as const,
    },
  ];

  const virtualCourses = [
    {
      title: "Dominando el Amigurumi",
      description: "Curso completo desde cero para crear tus propios muñecos de crochet.",
      date: "Acceso Permanente",
      duration: "15 lecciones (4h contenido)",
      price: 95000,
      image: heroImage,
      type: 'virtual' as const,
      videoPreviewUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // Mock video
    },
    {
      title: "Tapiz de Macramé Moderno",
      description: "Decora tu casa con un tapiz profesional hecho por ti.",
      date: "Acceso Permanente",
      duration: "8 lecciones (2.5h contenido)",
      price: 85000,
      image: heroImage,
      type: 'virtual' as const,
      videoPreviewUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // Mock video
    }
  ];

  const onSubmit = async (data: ReservationForm) => {
    setIsSubmitting(true);

    const message = encodeURIComponent(
      `¡Hola Macrayola! Me gustaría reservar un cupo para el curso presencial:\n\n` +
      `Curso: ${data.course}\n` +
      `Nombre: ${data.name}\n` +
      `Email: ${data.email}\n` +
      `Participantes: ${data.attendees}\n` +
      `Mensaje: ${data.message || 'Sin mensaje adicional'}`
    );

    window.open(`https://wa.me/573104019806?text=${message}`, '_blank');

    toast.success("¡Reserva enviada a WhatsApp!", {
      description: "Se ha generado tu mensaje de reserva.",
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
              Cursos Macrayola
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto animate-fade-in">
              Aprende las técnicas de crochet y macramé. Elige entre nuestras clases presenciales en grupo o nuestra academia virtual.
            </p>
          </div>
        </section>

        {/* Courses Presenciales */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-3xl font-bold text-foreground mb-8 border-l-4 border-primary pl-4">
              Próximos Cursos Presenciales
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course, index) => (
                <div
                  key={index}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CourseCard {...course} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Courses Virtuales */}
        <section className="py-16 bg-accent/5">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-3xl font-bold text-foreground mb-4 border-l-4 border-accent pl-4">
              Academia Virtual Macrayola
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl">
              Aprende a tu ritmo desde cualquier lugar. Mira el video de introducción y adquiere el curso completo para acceder a todas las lecciones.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {virtualCourses.map((course, index) => (
                <div
                  key={index}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CourseCard
                    {...course}
                    onPreview={(url, title) => setActiveVideo({ url, title })}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Video Preview Modal */}
        <Dialog open={!!activeVideo} onOpenChange={() => setActiveVideo(null)}>
          <DialogContent className="sm:max-w-4xl p-0 overflow-hidden bg-black">
            <DialogHeader className="p-4 bg-card">
              <DialogTitle className="font-display text-xl">{activeVideo?.title} - Introducción</DialogTitle>
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
              <div className="p-6 bg-card border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-sm text-muted-foreground max-w-md">
                  Este es un video de demostración. Adquiere el curso para desbloquear todas las lecciones y materiales descargables.
                </p>
                <Button
                  onClick={() => {
                    toast.info("Función de pago", {
                      description: "Redirigiendo a la pasarela de pago para este curso..."
                    });
                    setActiveVideo(null);
                  }}
                  className="w-full md:w-auto bg-accent hover:bg-accent/90"
                >
                  Comprar Curso Completo
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Reservation Form */}
        <section id="reservar" className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Reserva Tu Cupo Presencial
                </h2>
                <p className="text-muted-foreground">
                  Completa el formulario y te confirmaremos la disponibilidad para nuestras clases en vivo
                </p>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-card p-8 rounded-lg shadow-card space-y-6"
              >
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <Label htmlFor="phone">Teléfono *</Label>
                    <Input
                      id="phone"
                      {...register("phone")}
                      placeholder="+57 310 4019806"
                      className="mt-1.5"
                    />
                    {errors.phone && (
                      <p className="text-destructive text-sm mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="course">Curso Presencial *</Label>
                  <select
                    id="course"
                    {...register("course")}
                    className="w-full mt-1.5 px-3 py-2 border border-input rounded-md bg-background text-foreground"
                  >
                    <option value="">Selecciona un curso</option>
                    {courses.map((course, index) => (
                      <option key={index} value={course.title}>
                        {course.title} - {course.date}
                      </option>
                    ))}
                  </select>
                  {errors.course && (
                    <p className="text-destructive text-sm mt-1">{errors.course.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="attendees">Número de Asistentes *</Label>
                  <Input
                    id="attendees"
                    type="number"
                    min="1"
                    {...register("attendees")}
                    placeholder="1"
                    className="mt-1.5"
                  />
                  {errors.attendees && (
                    <p className="text-destructive text-sm mt-1">{errors.attendees.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="message">Mensaje (opcional)</Label>
                  <Textarea
                    id="message"
                    {...register("message")}
                    placeholder="Alguna pregunta o comentario..."
                    className="mt-1.5"
                    rows={4}
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
                  {isSubmitting ? "Enviando..." : "Enviar Reserva"}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  * Campos obligatorios. Te contactaremos en 24-48 horas para confirmar tu reserva.
                </p>
              </form>
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-8 shadow-card">
              <h3 className="font-display text-2xl font-semibold mb-4 text-center">
                Información Importante
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Materiales incluidos en presenciales</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold">•</span>
                  <span>Acceso de por vida en virtuales</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Máximo 8 personas por grupo vivo</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold">•</span>
                  <span>Soporte vía WhatsApp para dudas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Certificado al finalizar el curso</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold">•</span>
                  <span>Videos en HD con paso a paso detallado</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Cursos;
