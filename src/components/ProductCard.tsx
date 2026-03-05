import { ShoppingCart, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useCart } from "@/store/useCart";
import { toast } from "sonner";
import { getVideoThumbnail } from "@/lib/utils";

interface ProductCardProps {
  id?: string;
  name: string;
  price: number;
  image: string; // This is the URL (mediaUrl)
  mediaType?: 'image' | 'video';
  description: string;
  materials?: string;
  onPreview?: (url: string, title: string) => void;
}

const ProductCard = ({ id, name, price, image, mediaType = 'image', description, materials, onPreview }: ProductCardProps) => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({ name, price, image });
    toast.success("Añadido al carrito", {
      description: `${name} ha sido agregado a tu cesta.`,
    });
  };

  const handleClick = () => {
    if (mediaType === 'video' && onPreview) {
      onPreview(image, name);
    }
  };

  return (
    <Card className={`shadow-card hover:shadow-soft transition-smooth overflow-hidden group ${mediaType === 'video' ? 'cursor-pointer' : ''}`} onClick={handleClick}>
      <div className="aspect-square overflow-hidden bg-muted relative">
        <img
          src={mediaType === 'video' ? getVideoThumbnail(image) : image}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover transition-smooth group-hover:scale-105"
        />
        {mediaType === 'video' && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-smooth">
            <PlayCircle className="h-12 w-12 text-white drop-shadow-lg opacity-80 group-hover:opacity-100 transition-smooth" />
          </div>
        )}
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
        <Button onClick={handleAddToCart} className="transition-smooth hover:scale-105 bg-primary text-primary-foreground">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Añadir al Carrito
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
