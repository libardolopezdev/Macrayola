/**
 * Proyecto: Macrayola
 * Desarrollado por: El Ingeniero de Software Libardo Lopez
 * Archivo: CourseCard.tsx
 */
import { Calendar, Clock, Users, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface CourseCardProps {
  title: string;
  description: string;
  date: string;
  duration: string;
  maxStudents?: number;
  price: number;
  image: string;
  type?: 'presencial' | 'virtual';
  videoPreviewUrl?: string;
  onPreview?: (url: string, title: string) => void;
}

const CourseCard = ({
  title,
  description,
  date,
  duration,
  maxStudents,
  price,
  image,
  type = 'presencial',
  videoPreviewUrl,
  onPreview,
}: CourseCardProps) => {
  const handleClick = () => {
    if (type === 'virtual' && videoPreviewUrl && onPreview) {
      onPreview(videoPreviewUrl, title);
    }
  };

  return (
    <Card className="shadow-card hover:shadow-soft transition-smooth overflow-hidden group">
      <div
        className={`relative h-48 overflow-hidden bg-muted ${type === 'virtual' ? 'cursor-pointer' : ''}`}
        onClick={handleClick}
      >
        <img src={image} alt={title} className="w-full h-full object-cover transition-smooth group-hover:scale-110" />
        {type === 'virtual' && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-smooth">
            <PlayCircle className="h-12 w-12 text-white drop-shadow-lg opacity-80 group-hover:opacity-100 transition-smooth" />
          </div>
        )}
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${type === 'virtual' ? 'bg-accent text-white' : 'bg-primary text-white'
            }`}>
            {type === 'virtual' ? 'Virtual' : 'Presencial'}
          </span>
        </div>
      </div>
      <CardHeader>
        <h3 className="font-display text-2xl font-semibold text-foreground leading-tight">{title}</h3>
        <p className="text-muted-foreground text-sm line-clamp-2">{description}</p>
      </CardHeader>
      <CardContent className="space-y-3 pb-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 text-primary" />
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4 text-primary" />
          <span>{duration}</span>
        </div>
        {maxStudents && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4 text-primary" />
            <span>Máximo {maxStudents} participantes</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t border-border pt-4">
        <div className="flex flex-col">
          <span className="text-xs text-muted-foreground">Total</span>
          <span className="font-display text-2xl font-bold text-primary">${price.toLocaleString('es-CO')}</span>
        </div>
        {type === 'virtual' ? (
          <Button
            variant="secondary"
            className="transition-smooth hover:scale-105"
            onClick={handleClick}
          >
            Ver Trailer
          </Button>
        ) : (
          <Button asChild className="transition-smooth hover:scale-105">
            <Link to="/cursos#reservar">Reservar Cupo</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
