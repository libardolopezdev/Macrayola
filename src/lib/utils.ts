/**
 * Proyecto: Macrayola
 * Desarrollado por: El Ingeniero de Software Libardo Lopez
 * Archivo: utils.ts
 */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getVideoThumbnail(url: string) {
  if (!url) return "";
  if (url.includes('cloudinary.com') && url.includes('/video/upload/')) {
    // Reemplaza la extensión por .jpg y agrega transformación para captura automática (so_auto)
    return url.replace(/\/video\/upload\/(.+)\.[a-z0-9]+$/i, '/video/upload/f_auto,so_auto/$1.jpg');
  }
  // Imagen por defecto si no es de Cloudinary o hay un error
  return "https://images.unsplash.com/photo-1460661419201-fd4cecea8f82?auto=format&fit=crop&q=80&w=800";
}
