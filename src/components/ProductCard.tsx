import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface ProductCardProps {
  name: string;
  price: number;
  image: string;
  description: string;
  materials?: string;
}

const ProductCard = ({ name, price, image, description, materials }: ProductCardProps) => {
  const whatsappMessage = encodeURIComponent(
    `¡Hola Macrayola! Estoy interesada en el producto "${name}" que vi en el catálogo de la web. ¿Me podrías dar más información sobre el precio de $${price.toLocaleString('es-CO')} y disponibilidad?`
  );
  const whatsappLink = `https://wa.me/573104019806?text=${whatsappMessage}`;

  return (
    <Card className="shadow-card hover:shadow-soft transition-smooth overflow-hidden group">
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-smooth group-hover:scale-105"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-display text-xl font-semibold mb-2 text-foreground">{name}</h3>
        <p className="text-sm text-muted-foreground mb-2">{description}</p>
        {materials && (
          <p className="text-xs text-muted-foreground italic">Materiales: {materials}</p>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <span className="font-display text-2xl font-bold text-primary">${price.toLocaleString('es-CO')}</span>
        <Button asChild className="transition-smooth hover:scale-105">
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="mr-2 h-4 w-4" />
            Pedir por WhatsApp
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
