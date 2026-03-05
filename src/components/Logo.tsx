/**
 * Proyecto: Macrayola
 * Desarrollado por: El Ingeniero de Software Libardo Lopez
 * Archivo: Logo.tsx
 */
import logoImg from "@/assets/logo-macrayola.png";

interface LogoProps {
  className?: string;
  showText?: boolean;
  imgClassName?: string;
}

const Logo = ({ className = "", showText = true, imgClassName = "h-10 w-10" }: LogoProps) => {
  return (
    <div className={`flex items-center space-x-2 logo-container ${className}`}>
      <img
        src={logoImg}
        alt="Macrayola Logo"
        className={`${imgClassName} object-contain rounded-full border border-primary/20 shadow-sm transition-transform duration-300 hover:rotate-12`}
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
