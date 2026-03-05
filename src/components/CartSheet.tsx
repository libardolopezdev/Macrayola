import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShoppingCart, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/store/useCart";
import { Badge } from "@/components/ui/badge";

export function CartSheet() {
    const { items, removeItem, updateQuantity, getTotalPrice, getTotalItems } = useCart();

    const handleCheckout = () => {
        if (items.length === 0) return;

        let message = `¡Hola Macrayola! Quiero realizar el siguiente pedido:\n\n`;
        items.forEach(item => {
            message += `- ${item.quantity}x ${item.name} ($${(item.price * item.quantity).toLocaleString('es-CO')})\n`;
        });
        message += `\n*Total: $${getTotalPrice().toLocaleString('es-CO')}*\n\nQuedo atenta(o) a los medios de pago.`;

        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/573104019806?text=${encodedMessage}`, '_blank');
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative transition-smooth hover:scale-105">
                    <ShoppingCart className="h-5 w-5" />
                    {getTotalItems() > 0 && (
                        <Badge className="absolute -top-2 -right-2 px-1.5 min-w-[20px] h-5 flex items-center justify-center pointer-events-none bg-primary text-primary-foreground">
                            {getTotalItems()}
                        </Badge>
                    )}
                </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md flex flex-col h-full bg-background border-l">
                <SheetHeader className="px-1 text-left">
                    <SheetTitle className="font-display text-2xl flex items-center gap-2">
                        <ShoppingCart className="h-6 w-6 text-primary" />
                        Tu Carrito
                    </SheetTitle>
                </SheetHeader>

                {items.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground space-y-4">
                        <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center">
                            <ShoppingCart className="h-12 w-12 opacity-50" />
                        </div>
                        <p className="text-lg">Tu carrito está vacío</p>
                    </div>
                ) : (
                    <>
                        <ScrollArea className="flex-1 -mx-6 px-6 my-4">
                            <div className="space-y-6">
                                {items.map((item) => (
                                    <div key={item.id} className="flex gap-4 bg-card p-3 rounded-xl shadow-soft">
                                        <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0 ring-1 ring-border">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between py-1">
                                            <div className="flex justify-between items-start">
                                                <h4 className="font-medium line-clamp-2 pr-2">{item.name}</h4>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-6 w-6 text-muted-foreground hover:text-destructive hover:bg-destructive/10 -mt-1 -mr-1"
                                                    onClick={() => removeItem(item.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            <div className="flex items-center justify-between mt-2">
                                                <p className="text-sm font-semibold text-primary">
                                                    ${(item.price * item.quantity).toLocaleString('es-CO')}
                                                </p>
                                                <div className="flex items-center border rounded-lg bg-background">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-7 w-7 rounded-r-none"
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    >
                                                        <Minus className="h-3 w-3" />
                                                    </Button>
                                                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-7 w-7 rounded-l-none"
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    >
                                                        <Plus className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>

                        <div className="space-y-4 pt-6 border-t mt-auto">
                            <div className="flex items-center justify-between font-display font-semibold text-xl">
                                <span>Total</span>
                                <span className="text-primary">${getTotalPrice().toLocaleString('es-CO')}</span>
                            </div>
                            <SheetFooter className="sm:justify-stretch">
                                <Button className="w-full transition-smooth hover:scale-[1.02]" size="lg" onClick={handleCheckout}>
                                    Enviar Pedido vía WhatsApp
                                </Button>
                            </SheetFooter>
                        </div>
                    </>
                )}
            </SheetContent>
        </Sheet>
    );
}
