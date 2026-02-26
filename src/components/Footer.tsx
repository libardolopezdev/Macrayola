/**
 * Proyecto: Macrayola
 * Desarrollado por: El Ingeniero de Software Libardo Lopez
 * Archivo: Footer.tsx
 */
import { Link } from "react-router-dom";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Logo />
            <p className="text-muted-foreground text-sm">
              Piezas artesanales hechas a mano con amor. Crochet y macramé para tu hogar.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Enlaces</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/tienda" className="text-muted-foreground hover:text-primary transition-smooth">
                  Tienda
                </Link>
              </li>
              <li>
                <Link to="/cursos" className="text-muted-foreground hover:text-primary transition-smooth">
                  Cursos
                </Link>
              </li>
              <li>
                <Link to="/galeria" className="text-muted-foreground hover:text-primary transition-smooth">
                  Galería
                </Link>
              </li>
              <li>
                <Link to="/sobre-mi" className="text-muted-foreground hover:text-primary transition-smooth">
                  Sobre Mí
                </Link>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Información</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/politicas" className="text-muted-foreground hover:text-primary transition-smooth">
                  Políticas de Envío
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="text-muted-foreground hover:text-primary transition-smooth">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contacto</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>yolis2007@hotmail.es</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+57 310 4019806</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Medellín, Colombia</span>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-smooth"
                >
                  <Instagram className="h-4 w-4" />
                  <span>@hilosynudos</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Macrayola. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
