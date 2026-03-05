import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Lock } from "lucide-react";
import Logo from "@/components/Logo";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/admin";

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            toast.success("Bienvenido al panel de administración");
            navigate(from, { replace: true });
        } catch (error: any) {
            console.error("Login error:", error);
            toast.error("Error al iniciar sesión", {
                description: "Revisa que tu correo y contraseña sean correctos.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-secondary/30 px-4">
            <div className="max-w-md w-full bg-card rounded-2xl shadow-card p-8 border border-border">
                <div className="flex flex-col items-center mb-8">
                    <Logo showText={false} imgClassName="h-20 w-20 mb-4" />
                    <h1 className="font-display text-2xl font-bold text-foreground">Acceso Administrador</h1>
                    <p className="text-sm text-muted-foreground text-center mt-2">
                        Área restringida para la administración del inventario.
                    </p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="email">Correo Electrónico</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="admin@macrayola.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Contraseña</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full"
                        />
                    </div>

                    <Button type="submit" className="w-full transition-smooth hover:scale-[1.02]" disabled={loading}>
                        {loading ? (
                            <Loader2 className="h-5 w-5 animate-spin mx-auto" />
                        ) : (
                            <>
                                <Lock className="mr-2 h-4 w-4" />
                                Iniciar Sesión
                            </>
                        )}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Login;
