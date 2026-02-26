/**
 * Proyecto: Macrayola
 * Desarrollado por: El Ingeniero de Software Libardo Lopez
 * Archivo: Logo.tsx
 */
import logoImg from "@/assets/logo-macrayola.png";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

const Logo = ({ className = "", showText = true }: LogoProps) => {
  return (
    <div className={`flex items-center space-x-2 logo-container ${className}`}>
      <img
        src={logoImg}
        alt="Macrayola Logo"
        className="h-10 w-10 object-contain rounded-full border border-primary/20 shadow-sm"
      />
      {showText && (
        <span className="font-display text-xl font-semibold text-foreground">
          Macrayola
        </span>
      )}
    </div>
  );
};

export default Logo;
