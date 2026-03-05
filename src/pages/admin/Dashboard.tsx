import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { collection, getDocs, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Product } from "@/types/product";
import { Course } from "@/types/course";
import { ProductForm } from "./ProductForm";
import { CourseForm } from "./CourseForm";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, Plus, Pencil, Trash2, Loader2, Play, BookOpen, Package } from "lucide-react";
import Logo from "@/components/Logo";
import { toast } from "sonner";
import { getVideoThumbnail } from "@/lib/utils";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Dashboard = () => {
    const { signOut } = useAuth();
    const [products, setProducts] = useState<Product[]>([]);
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("products");

    // State for Forms
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [editingCourse, setEditingCourse] = useState<Course | null>(null);

    const fetchDashboardData = async () => {
        setLoading(true);
        try {
            // Fetch Products
            const pq = query(collection(db, "products"), orderBy("order", "asc"));
            const pSnapshot = await getDocs(pq);
            const pData: Product[] = [];
            pSnapshot.forEach((doc) => {
                pData.push({ id: doc.id, ...doc.data() } as Product);
            });
            setProducts(pData);

            // Fetch Courses
            const cq = query(collection(db, "courses"), orderBy("order", "asc"));
            const cSnapshot = await getDocs(cq);
            const cData: Course[] = [];
            cSnapshot.forEach((doc) => {
                cData.push({ id: doc.id, ...doc.data() } as Course);
            });
            setCourses(cData);
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
            toast.error("Error al cargar los datos");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const handleDelete = async (id: string, type: 'products' | 'courses') => {
        try {
            await deleteDoc(doc(db, type, id));
            toast.success(`${type === 'products' ? 'Producto' : 'Curso'} eliminado`);
            fetchDashboardData();
        } catch (error) {
            console.error(`Error deleting ${type}`, error);
            toast.error("Error al eliminar");
        }
    };

    const openNewForm = () => {
        setEditingProduct(null);
        setEditingCourse(null);
        setShowForm(true);
    };

    const openEditProduct = (p: Product) => {
        setEditingProduct(p);
        setEditingCourse(null);
        setShowForm(true);
    };

    const openEditCourse = (c: Course) => {
        setEditingCourse(c);
        setEditingProduct(null);
        setShowForm(true);
    };

    return (
        <div className="min-h-screen bg-secondary/30 pb-20">
            <header className="bg-card shadow-sm border-b border-border sticky top-0 z-10">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Logo imgClassName="h-8 w-8" showText={false} />
                        <h1 className="font-display font-semibold text-lg">Panel Administrativo</h1>
                    </div>
                    <Button variant="ghost" size="sm" onClick={signOut} className="text-muted-foreground hover:text-destructive transition-smooth">
                        <LogOut className="h-4 w-4 mr-2" />
                        Cerrar Sesión
                    </Button>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                {!showForm ? (
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h2 className="text-2xl font-bold">Gestión de Contenido</h2>
                                <p className="text-muted-foreground text-sm mt-1">Administra tus productos y cursos desde aquí.</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <TabsList className="grid grid-cols-2 w-[300px]">
                                    <TabsTrigger value="products">
                                        <Package className="h-4 w-4 mr-2" /> Productos
                                    </TabsTrigger>
                                    <TabsTrigger value="courses">
                                        <BookOpen className="h-4 w-4 mr-2" /> Cursos
                                    </TabsTrigger>
                                </TabsList>
                                <Button onClick={openNewForm} className="transition-smooth hover:scale-105">
                                    <Plus className="h-4 w-4 mr-2" /> Nuevo {activeTab === "products" ? "Producto" : "Curso"}
                                </Button>
                            </div>
                        </div>

                        {loading ? (
                            <div className="bg-card rounded-lg shadow-sm border border-border p-12 text-center flex flex-col items-center">
                                <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
                                <p className="text-muted-foreground">Sincronizando con Firebase...</p>
                            </div>
                        ) : (
                            <>
                                <TabsContent value="products" className="animate-fade-in outline-none">
                                    {products.length === 0 ? (
                                        <div className="bg-card rounded-lg shadow-sm border border-border p-12 text-center">
                                            <p className="text-muted-foreground mb-4">No hay productos en tu inventario aún.</p>
                                            <Button variant="outline" onClick={openNewForm}>Agregar Producto</Button>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                            {products.map((p) => (
                                                <div key={p.id} className="bg-card rounded-xl border border-border overflow-hidden shadow-soft transition-smooth hover:border-primary/50 group flex flex-col">
                                                    <div className="aspect-square w-full overflow-hidden bg-muted relative">
                                                        {p.mediaType === 'video' ? (
                                                            <div className="w-full h-full flex items-center justify-center bg-black">
                                                                <Play className="h-12 w-12 text-white opacity-50 z-10" />
                                                                <video
                                                                    src={p.image}
                                                                    poster={getVideoThumbnail(p.image)}
                                                                    className="absolute inset-0 w-full h-full object-cover opacity-50"
                                                                    muted
                                                                />
                                                                <span className="absolute top-2 left-2 bg-primary text-[10px] text-white px-2 py-0.5 rounded-full font-bold uppercase z-10">Video</span>
                                                            </div>
                                                        ) : (
                                                            <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-smooth" />
                                                        )}
                                                    </div>
                                                    <div className="p-4 flex-1 flex flex-col">
                                                        <div className="flex justify-between items-start mb-2">
                                                            <h3 className="font-display font-bold text-lg leading-tight line-clamp-1" title={p.name}>{p.name}</h3>
                                                            <span className="text-[10px] bg-secondary text-secondary-foreground px-1.5 py-0.5 rounded font-mono">Pos: {p.order}</span>
                                                        </div>
                                                        <span className="font-semibold text-primary bg-primary/10 px-2 py-1 rounded-md text-sm self-start mb-3">
                                                            ${p.price.toLocaleString('es-CO')}
                                                        </span>
                                                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">{p.description}</p>
                                                        <div className="flex items-center gap-2 pt-4 border-t border-border mt-auto">
                                                            <Button variant="outline" size="sm" className="flex-1" onClick={() => openEditProduct(p)}>
                                                                <Pencil className="h-4 w-4 mr-2" /> Editar
                                                            </Button>
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                className="flex-1 text-destructive hover:bg-destructive/10"
                                                                onClick={() => {
                                                                    if (confirm(`¿Eliminar ${p.name}?`)) handleDelete(p.id!, 'products')
                                                                }}
                                                            >
                                                                <Trash2 className="h-4 w-4 mr-2" /> Borrar
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </TabsContent>

                                <TabsContent value="courses" className="animate-fade-in outline-none">
                                    {courses.length === 0 ? (
                                        <div className="bg-card rounded-lg shadow-sm border border-border p-12 text-center">
                                            <p className="text-muted-foreground mb-4">No hay cursos registrados aún.</p>
                                            <Button variant="outline" onClick={openNewForm}>Agregar Curso</Button>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {courses.map((c) => (
                                                <div key={c.id} className="bg-card rounded-xl border border-border overflow-hidden shadow-soft transition-smooth hover:border-primary/50 group flex flex-col">
                                                    <div className="aspect-video w-full overflow-hidden bg-muted relative">
                                                        {c.mediaType === 'video' ? (
                                                            <div className="w-full h-full flex items-center justify-center bg-black">
                                                                <Play className="h-10 w-10 text-white opacity-50 z-10" />
                                                                <video
                                                                    src={c.mediaUrl}
                                                                    poster={getVideoThumbnail(c.mediaUrl)}
                                                                    className="absolute inset-0 w-full h-full object-cover opacity-50"
                                                                    muted
                                                                />
                                                                <span className="absolute top-2 left-2 bg-accent text-[10px] text-white px-2 py-0.5 rounded-full font-bold uppercase z-10">Video</span>
                                                            </div>
                                                        ) : (
                                                            <img src={c.mediaUrl} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition-smooth" />
                                                        )}
                                                        <span className={`absolute bottom-2 right-2 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${c.type === 'virtual' ? 'bg-blue-500 text-white' : 'bg-green-500 text-white'}`}>
                                                            {c.type}
                                                        </span>
                                                    </div>
                                                    <div className="p-4 flex-1 flex flex-col">
                                                        <div className="flex justify-between items-start mb-2">
                                                            <h3 className="font-display font-bold text-lg leading-tight line-clamp-1">{c.title}</h3>
                                                            <span className="text-[10px] bg-secondary px-1.5 py-0.5 rounded font-mono">Pos: {c.order}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2 mb-3">
                                                            <span className="font-semibold text-accent bg-accent/10 px-2 py-1 rounded-md text-xs">
                                                                ${c.price.toLocaleString('es-CO')}
                                                            </span>
                                                            <span className="text-xs text-muted-foreground">{c.duration}</span>
                                                        </div>
                                                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">{c.description}</p>
                                                        <div className="flex items-center gap-2 pt-4 border-t border-border mt-auto">
                                                            <Button variant="outline" size="sm" className="flex-1" onClick={() => openEditCourse(c)}>
                                                                <Pencil className="h-4 w-4 mr-2" /> Editar
                                                            </Button>
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                className="flex-1 text-destructive hover:bg-destructive/10"
                                                                onClick={() => {
                                                                    if (confirm(`¿Eliminar ${c.title}?`)) handleDelete(c.id!, 'courses')
                                                                }}
                                                            >
                                                                <Trash2 className="h-4 w-4 mr-2" /> Borrar
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </TabsContent>
                            </>
                        )}
                    </Tabs>
                ) : activeTab === "products" ? (
                    <ProductForm
                        product={editingProduct}
                        onCancel={() => setShowForm(false)}
                        onSuccess={() => {
                            setShowForm(false);
                            fetchDashboardData();
                        }}
                    />
                ) : (
                    <CourseForm
                        course={editingCourse}
                        onCancel={() => setShowForm(false)}
                        onSuccess={() => {
                            setShowForm(false);
                            fetchDashboardData();
                        }}
                    />
                )}
            </main>
        </div>
    );
};

export default Dashboard;
