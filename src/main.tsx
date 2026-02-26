/**
 * Proyecto: Macrayola
 * Desarrollado por: El Ingeniero de Software Libardo Lopez
 * Archivo: main.tsx
 */
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

const root = createRoot(rootElement);
root.render(<App />);
