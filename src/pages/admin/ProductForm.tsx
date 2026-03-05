import { useState, useRef } from "react";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { getVideoThumbnail } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Product } from "@/types/product";
import { Loader2, Upload, Image as ImageIcon, X } from "lucide-react";

interface ProductFormProps {
    product?: Product | null;
    onSuccess: () => void;
    onCancel: () => void;
}

export const ProductForm = ({ product, onSuccess, onCancel }: ProductFormProps) => {
    // CONFIGURACIÓN DE CLOUDINARY
    // Reemplaza estos valores con los de tu cuenta de Cloudinary
    const CLOUD_NAME = "drvgan9vn";
    const UPLOAD_PRESET = "macrayola_uploads";

    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState<Partial<Product>>(
        product || {
            name: "",
            price: 0,
            description: "",
            materials: "",
            image: "",
            order: 1,
        }
    );

    const [isDragging, setIsDragging] = useState(false);

    const compressImage = (file: File): Promise<Blob> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    let width = img.width;
                    let height = img.height;
                    const maxSize = 1000;

                    if (width > height) {
                        if (width > maxSize) {
                            height *= maxSize / width;
                            width = maxSize;
                        }
                    } else {
                        if (height > maxSize) {
                            width *= maxSize / height;
                            height = maxSize;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext("2d");
                    ctx?.drawImage(img, 0, 0, width, height);
                    canvas.toBlob(
                        (blob) => {
                            if (blob) {
                                console.log("Imagen comprimida exitosamente", blob.size);
                                resolve(blob);
                            } else {
                                reject(new Error("Error al convertir a blob"));
                            }
                        },
                        "image/webp",
                        0.8
                    );
                };
                img.onerror = () => reject(new Error("Error al cargar la imagen en el procesador"));
                img.src = event.target?.result as string;
            };
            reader.onerror = () => reject(new Error("Error al leer el archivo"));
        });
    };

    const processAndUploadFile = async (file: File) => {
        const isVideo = file.type.startsWith("video/");
        const isImage = file.type.startsWith("image/");

        if (!isImage && !isVideo) {
            toast.error("Por favor selecciona una imagen o video válido");
            return;
        }

        setUploading(true);
        setUploadProgress(0);

        try {
            let fileToUpload: File | Blob = file;
            const mediaType = isVideo ? 'video' : 'image';

            if (isImage) {
                console.log("Iniciando optimización para imagen:", file.name);
                toast.info("Optimizando imagen...");
                fileToUpload = await compressImage(file);
            } else {
                console.log("Subiendo video directamente (sin compresión local):", file.name);
                toast.info("Subiendo video...");
            }

            console.log(`Iniciando subida de ${mediaType} a Cloudinary...`);

            const formDataCloudinary = new FormData();
            formDataCloudinary.append('file', fileToUpload, isImage ? `${Date.now()}.webp` : file.name);
            formDataCloudinary.append('upload_preset', UPLOAD_PRESET);

            const xhr = new XMLHttpRequest();
            const resourceType = isVideo ? 'video' : 'image';
            xhr.open('POST', `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/upload`, true);

            xhr.upload.onprogress = (e) => {
                if (e.lengthComputable) {
                    const progress = (e.loaded / e.total) * 100;
                    setUploadProgress(progress);
                }
            };

            xhr.onload = () => {
                if (xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText);
                    console.log(`Subida a Cloudinary completada (${mediaType}). URL:`, response.secure_url);
                    setFormData(prev => ({
                        ...prev,
                        image: response.secure_url,
                        mediaType: mediaType
                    }));
                    setUploading(false);
                    toast.success(`${mediaType === 'video' ? 'Video' : 'Imagen'} subida correctamente`);
                } else {
                    const error = JSON.parse(xhr.responseText);
                    console.error("Error de Cloudinary:", error);
                    setUploading(false);
                    toast.error(`Error de Cloudinary: ${error.error?.message || "Error desconocido"}`);
                }
            };

            xhr.onerror = () => {
                console.error("Error de red al subir a Cloudinary");
                setUploading(false);
                toast.error("Error de red al conectar con Cloudinary");
            };

            xhr.send(formDataCloudinary);

        } catch (error: any) {
            console.error("Error en el procesamiento:", error);
            setUploading(false);
            toast.error(`Error: ${error.message || "No se pudo procesar el archivo"}`);
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) processAndUploadFile(file);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) processAndUploadFile(file);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.image) {
            toast.error("Debes subir o ingresar una imagen");
            return;
        }
        setLoading(true);

        try {
            const productData = {
                ...formData,
                price: Number(formData.price),
                order: Number(formData.order || 0),
            };

            if (product?.id) {
                // Editar existente
                const productRef = doc(db, "products", product.id);
                await updateDoc(productRef, productData);
                toast.success("Producto actualizado exitosamente");
            } else {
                // Crear nuevo
                await addDoc(collection(db, "products"), {
                    ...productData,
                    createdAt: new Date(),
                });
                toast.success("Producto creado exitosamente");
            }
            onSuccess();
        } catch (error) {
            console.error(error);
            toast.error("Hubo un error al guardar el producto");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-card p-6 rounded-xl border border-border shadow-soft animate-fade-in max-w-4xl mx-auto">
            <h3 className="font-display text-2xl font-bold mb-6 text-foreground">
                {product ? "Editar Producto" : "Agregar Nuevo Producto"}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label>Nombre del Producto</Label>
                    <Input
                        required
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ej: Tapiz Macramé"
                    />
                </div>
                <div className="space-y-2 flex gap-4">
                    <div className="flex-1">
                        <Label>Precio (COP)</Label>
                        <Input
                            required
                            type="number"
                            value={formData.price}
                            onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                            placeholder="50000"
                        />
                    </div>
                    <div className="w-24">
                        <Label>Orden</Label>
                        <Input
                            required
                            type="number"
                            value={formData.order}
                            onChange={e => setFormData({ ...formData, order: Number(e.target.value) })}
                            placeholder="1"
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <Label>Imagen del Producto</Label>
                <div className="flex flex-col md:flex-row gap-4">
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`flex-1 border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors relative overflow-hidden ${isDragging
                            ? "border-primary bg-primary/10 scale-[1.02]"
                            : "border-border bg-secondary/20 hover:border-primary/50"
                            }`}
                    >
                        <input
                            type="file"
                            hidden
                            ref={fileInputRef}
                            onChange={handleFileUpload}
                            accept="image/*"
                        />
                        {uploading ? (
                            <>
                                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                                <span className="text-sm font-medium">{Math.round(uploadProgress)}% subiendo...</span>
                                <div className="absolute bottom-0 left-0 h-1 bg-primary" style={{ width: `${uploadProgress}%` }} />
                            </>
                        ) : formData.image ? (
                            <div className="text-center">
                                {formData.mediaType === 'video' ? (
                                    <div className="flex flex-col items-center">
                                        <div className="bg-primary/10 p-3 rounded-full mb-2">
                                            <Upload className="h-6 w-6 text-primary" />
                                        </div>
                                        <span className="text-sm text-primary font-medium">Video cargado</span>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center">
                                        <ImageIcon className="h-8 w-8 mx-auto text-primary mb-2" />
                                        <span className="text-sm text-primary font-medium">Foto cargada</span>
                                    </div>
                                )}
                                <span className="text-xs text-muted-foreground mt-1 block">Click para cambiar</span>
                            </div>
                        ) : (
                            <>
                                <Upload className="h-8 w-8 text-muted-foreground" />
                                <p className="text-sm text-center text-muted-foreground">
                                    Haz click o arrastra imagen/video aquí
                                </p>
                            </>
                        )}
                    </div>

                    <div className="flex-1 space-y-2">
                        <Label className="text-xs text-muted-foreground">Vista previa del archivo:</Label>
                        <div className="relative h-40 w-full rounded-md overflow-hidden bg-muted border border-border group flex items-center justify-center">
                            {formData.image ? (
                                <>
                                    {formData.mediaType === 'video' ? (
                                        <video
                                            src={formData.image}
                                            poster={getVideoThumbnail(formData.image)}
                                            controls
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <img src={formData.image} alt="Preview" className="h-full w-full object-cover" />
                                    )}
                                    <button
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, image: "", mediaType: "image" }))}
                                        className="absolute top-2 right-2 p-1.5 bg-destructive text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-lg"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </>
                            ) : (
                                <div className="text-muted-foreground flex flex-col items-center gap-2">
                                    <ImageIcon className="h-8 w-8 opacity-20" />
                                    <span className="text-xs">Sin archivo seleccionado</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <Label>Materiales</Label>
                <Input
                    value={formData.materials}
                    onChange={e => setFormData({ ...formData, materials: e.target.value })}
                    placeholder="Ej: Algodón 100%, Madera"
                />
            </div>

            <div className="space-y-2">
                <Label>Descripción Corta</Label>
                <Textarea
                    required
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe el encanto de tu pieza..."
                    rows={3}
                />
            </div>

            <div className="flex justify-end space-x-3 pt-6 border-t border-border">
                <Button type="button" variant="outline" onClick={onCancel}>Cancelar</Button>
                <Button type="submit" disabled={loading || uploading} className="px-8">
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Guardar Producto
                </Button>
            </div>
        </form>
    );
};
