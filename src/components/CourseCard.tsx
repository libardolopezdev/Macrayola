import { Calendar, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface CourseCardProps {
  title: string;
  description: string;
  date: string;
  duration: string;
  maxStudents: number;
  price: number;
  image: string;
}

const CourseCard = ({
  title,
  description,
  date,
  duration,
  maxStudents,
  price,
  image,
}: CourseCardProps) => {
  return (
    <Card className="shadow-card hover:shadow-soft transition-smooth overflow-hidden">
      <div className="h-48 overflow-hidden bg-muted">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <CardHeader>
        <h3 className="font-display text-2xl font-semibold text-foreground">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 text-primary" />
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4 text-primary" />
          <span>{duration}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4 text-primary" />
          <span>Máximo {maxStudents} participantes</span>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <span className="font-display text-2xl font-bold text-primary">{price}€</span>
        <Button asChild>
          <Link to="/cursos#reservar">Reservar Cupo</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
