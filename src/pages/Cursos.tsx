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
      price: 45,
      image: heroImage,
    },
    {
      title: "Macramé Intermedio",
      description: "Técnicas avanzadas de nudos y patrones decorativos",
      date: "22 de Enero, 2025",
      duration: "4 horas (10:00 - 14:00)",
      maxStudents: 6,
      price: 55,
      image: heroImage,
    },
    {
      title: "Cesta de Crochet",
      description: "Crea una cesta decorativa paso a paso",
      date: "29 de Enero, 2025",
      duration: "5 horas (10:00 - 15:00)",
      maxStudents: 8,
      price: 60,
      image: heroImage,
    },
  ];

  const onSubmit = async (data: ReservationForm) => {
    setIsSubmitting(true);
    
    // Simulación de envío - aquí se integraría con backend/email
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    toast.success("¡Reserva enviada!", {
      description: "Te contactaremos pronto para confirmar tu cupo.",
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
              Cursos Presenciales
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto animate-fade-in">
              Aprende las técnicas de crochet y macramé en grupos pequeños. Todos los materiales
              incluidos.
            </p>
          </div>
        </section>

        {/* Courses */}
        <section className="py-16">
          <div className="container mx-auto px-4">
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

        {/* Reservation Form */}
        <section id="reservar" className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Reserva Tu Cupo
                </h2>
                <p className="text-muted-foreground">
                  Completa el formulario y te confirmaremos la disponibilidad
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
                      placeholder="+34 600 000 000"
                      className="mt-1.5"
                    />
                    {errors.phone && (
                      <p className="text-destructive text-sm mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="course">Curso Elegido *</Label>
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
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Todos los materiales están incluidos en el precio del curso</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Grupos reducidos para atención personalizada (máximo 8 personas)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>No se requiere experiencia previa en cursos para principiantes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Incluye pausa para café y refrigerios</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Te llevas a casa tu proyecto terminado</span>
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
