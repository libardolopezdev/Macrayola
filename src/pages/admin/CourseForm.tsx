import { useState, useRef } from "react";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { getVideoThumbnail } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Course } from "@/types/course";
import { Loader2, Upload, Image as ImageIcon, X } from "lucide-react";

interface CourseFormProps {
    course?: Course | null;
    onSuccess: () => void;
    onCancel: () => void;
}

export const CourseForm = ({ course, onSuccess, onCancel }: CourseFormProps) => {
    const CLOUD_NAME = "drvgan9vn";
    const UPLOAD_PRESET = "macrayola_uploads";

    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState<Partial<Course>>(
        course || {
            title: "",
            description: "",
            date: "",
            duration: "",
            price: 0,
            mediaUrl: "",
            mediaType: "image",
            type: "presencial",
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
                            if (blob) resolve(blob);
                            else reject(new Error("Error al convertir a blob"));
                        },
                        "image/webp",
                        0.8
                    );
                };
                img.onerror = () => reject(new Error("Error al cargar la imagen"));
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
                toast.info("Optimizando imagen...");
                fileToUpload = await compressImage(file);
            } else {
                toast.info("Subiendo video...");
            }

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
                    setFormData(prev => ({
                        ...prev,
                        mediaUrl: response.secure_url,
                        mediaType: mediaType
                    }));
                    setUploading(false);
                    toast.success("Archivo subido correctamente");
                } else {
                    const error = JSON.parse(xhr.responseText);
                    setUploading(false);
                    toast.error(`Error: ${error.error?.message || "Error desconocido"}`);
                }
            };

            xhr.onerror = () => {
                setUploading(false);
                toast.error("Error de red");
            };

            xhr.send(formDataCloudinary);

        } catch (error: any) {
            setUploading(false);
            toast.error(`Error: ${error.message}`);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.mediaUrl) {
            toast.error("Debes subir un archivo multimedia");
            return;
        }
        setLoading(true);

        try {
            const courseData = {
                ...formData,
                price: Number(formData.price),
                order: Number(formData.order || 0),
            };

            if (course?.id) {
                await updateDoc(doc(db, "courses", course.id), courseData);
                toast.success("Curso actualizado");
            } else {
                await addDoc(collection(db, "courses"), {
                    ...courseData,
                    createdAt: new Date(),
                });
                toast.success("Curso creado");
            }
            onSuccess();
        } catch (error) {
            toast.error("Error al guardar el curso");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-card p-6 rounded-xl border border-border shadow-soft animate-fade-in max-w-4xl mx-auto">
            <h3 className="font-display text-2xl font-bold mb-6 text-foreground">
                {course ? "Editar Curso" : "Agregar Nuevo Curso"}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label>Título del Curso</Label>
                    <Input
                        required
                        value={formData.title}
                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Ej: Crochet para Principiantes"
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
                        />
                    </div>
                    <div className="w-24">
                        <Label>Orden</Label>
                        <Input
                            required
                            type="number"
                            value={formData.order}
                            onChange={e => setFormData({ ...formData, order: Number(e.target.value) })}
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                    <Label>Fecha / Estado</Label>
                    <Input
                        value={formData.date}
                        onChange={e => setFormData({ ...formData, date: e.target.value })}
                        placeholder="Ej: 15 de Enero, 2025"
                    />
                </div>
                <div className="space-y-2">
                    <Label>Duración</Label>
                    <Input
                        value={formData.duration}
                        onChange={e => setFormData({ ...formData, duration: e.target.value })}
                        placeholder="Ej: 3 horas"
                    />
                </div>
                <div className="space-y-2">
                    <Label>Modalidad</Label>
                    <select
                        className="w-full px-3 py-2 border border-input rounded-md bg-background"
                        value={formData.type}
                        onChange={e => setFormData({ ...formData, type: e.target.value as any })}
                    >
                        <option value="presencial">Presencial</option>
                        <option value="virtual">Virtual</option>
                    </select>
                </div>
            </div>

            <div className="space-y-2">
                <Label>Imagen o Video de Portada</Label>
                <div className="flex flex-col md:flex-row gap-4">
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={e => { e.preventDefault(); setIsDragging(false); const f = e.dataTransfer.files[0]; if (f) processAndUploadFile(f); }}
                        className={`flex-1 border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors relative overflow-hidden ${isDragging ? "border-primary bg-primary/10" : "border-border bg-secondary/20 h-40"}`}
                    >
                        <input type="file" hidden ref={fileInputRef} onChange={e => { const f = e.target.files?.[0]; if (f) processAndUploadFile(f); }} accept="image/*,video/*" />
                        {uploading ? (
                            <div className="flex flex-col items-center gap-2">
                                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                                <span className="text-sm">{Math.round(uploadProgress)}%</span>
                            </div>
                        ) : formData.mediaUrl ? (
                            <div className="text-center">
                                {formData.mediaType === 'video' ? <Upload className="h-8 w-8 mx-auto text-primary" /> : <ImageIcon className="h-8 w-8 mx-auto text-primary" />}
                                <span className="text-sm text-primary font-medium block mt-2">Cambiado</span>
                            </div>
                        ) : (
                            <div className="text-center">
                                <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                                <p className="text-xs text-muted-foreground mt-2">Sube imagen o video</p>
                            </div>
                        )}
                    </div>
                    <div className="flex-1">
                        <div className="relative h-40 w-full rounded-md overflow-hidden bg-muted border border-border group flex items-center justify-center">
                            {formData.mediaUrl ? (
                                <>
                                    {formData.mediaType === 'video' ? (
                                        <video
                                            src={formData.mediaUrl}
                                            poster={getVideoThumbnail(formData.mediaUrl)}
                                            controls
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <img src={formData.mediaUrl} alt="Preview" className="h-full w-full object-cover" />
                                    )}
                                    <button type="button" onClick={() => setFormData(prev => ({ ...prev, mediaUrl: "" }))} className="absolute top-2 right-2 p-1.5 bg-destructive text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                        <X className="h-4 w-4" />
                                    </button>
                                </>
                            ) : (
                                <span className="text-xs text-muted-foreground">Vista previa</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <Label>Descripción del Curso</Label>
                <Textarea
                    required
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                />
            </div>

            <div className="flex justify-end space-x-3 pt-6 border-t border-border">
                <Button type="button" variant="outline" onClick={onCancel}>Cancelar</Button>
                <Button type="submit" disabled={loading || uploading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Guardar Curso
                </Button>
            </div>
        </form>
    );
};
