import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Create({ categories }) {
    // Inicialización del formulario con useForm
    const { data, setData, post, errors } = useForm({
        name: "",
        description: "",
        price: "",
        category: "",
        brand: "",
        stock: "",
        sku: "",
        images: [],
    });

    const [previewImages, setPreviewImages] = useState([]);

    // Función para manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validación simple en cliente
        if (!data.name || !data.price || !data.stock || !data.category) {
            alert("Por favor, completa los campos obligatorios.");
            return;
        }

        post(route("product.store"), {
            onSuccess: () => {
                setData({
                    name: "",
                    description: "",
                    price: "",
                    category: "",
                    brand: "",
                    stock: "",
                    sku: "",
                    images: [],
                });
                setPreviewImages([]);
            },
        });
    };

    // Función para manejar el cambio de archivos
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);

        // Validación de que los archivos sean imágenes y que no superen el tamaño máximo (5MB)
        const validFiles = files.filter(
            (file) => file.type.startsWith("image/") && file.size < 5000000 // 5MB máximo
        );

        if (validFiles.length === 0) {
            alert(
                "Por favor, selecciona solo archivos de tipo imagen menores a 5MB."
            );
            return;
        }

        setData("images", validFiles);

        // Generar vistas previas
        const previews = validFiles.map((file) => URL.createObjectURL(file));
        setPreviewImages(previews);
    };

    // Función para eliminar una imagen
    const removeImage = (index) => {
        setData(
            "images",
            data.images.filter((_, i) => i !== index)
        );
        setPreviewImages(previewImages.filter((_, i) => i !== index));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2
                    className="font-semibold text-xl leading-tight"
                    style={{ color: "#333333" }}
                >
                    Crear Producto
                </h2>
            }
        >
            <Head title="Crear Producto" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {[
                                { label: "Nombre", id: "name", type: "text" },
                                {
                                    label: "Descripción",
                                    id: "description",
                                    type: "textarea",
                                },
                                {
                                    label: "Precio",
                                    id: "price",
                                    type: "number",
                                },
                                {
                                    label: "Categoría",
                                    id: "category",
                                    type: "select",
                                },
                                { label: "Marca", id: "brand", type: "text" },
                                { label: "Stock", id: "stock", type: "number" },
                                { label: "SKU", id: "sku", type: "text" },
                            ].map((field) => (
                                <div key={field.id}>
                                    <label
                                        htmlFor={field.id}
                                        className="block font-semibold text-gray-700"
                                    >
                                        {field.label}:
                                    </label>
                                    {field.type === "textarea" ? (
                                        <textarea
                                            id={field.id}
                                            value={data[field.id]}
                                            onChange={(e) =>
                                                setData(
                                                    field.id,
                                                    e.target.value
                                                )
                                            }
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                        />
                                    ) : field.type === "select" ? (
                                        <select
                                            id="category"
                                            value={data.category}
                                            onChange={(e) =>
                                                setData(
                                                    "category",
                                                    e.target.value
                                                )
                                            }
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                        >
                                            <option value="">
                                                Selecciona una categoría
                                            </option>
                                            <option value=""></option>
                                            {categories.map((category) => (
                                                <option
                                                    key={category.id}
                                                    value={category.id}
                                                >
                                                    {category.name}
                                                </option>
                                            ))}

                                            <select
                                                id="brand"
                                                value={data.brand}
                                                onChange={(e) =>
                                                    setData(
                                                        "brand",
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="">
                                                    Selecciona una marca
                                                </option>
                                                {brands.map((brand) => (
                                                    <option
                                                        key={brand.id}
                                                        value={brand.id}
                                                    >
                                                        {brand.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </select>
                                    ) : (
                                        <input
                                            type={field.type}
                                            id={field.id}
                                            value={data[field.id]}
                                            onChange={(e) =>
                                                setData(
                                                    field.id,
                                                    e.target.value
                                                )
                                            }
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                        />
                                    )}
                                    {errors[field.id] && (
                                        <div className="text-red-600">
                                            {errors[field.id]}
                                        </div>
                                    )}
                                </div>
                            ))}

                            <div>
                                <label
                                    htmlFor="images"
                                    className="block font-semibold text-gray-700"
                                >
                                    Imágenes:
                                </label>
                                <div className="flex items-center">
                                    <label
                                        htmlFor="images"
                                        className="inline-block px-4 py-2 bg-gray-800 text-white rounded cursor-pointer hover:bg-gray-600 transition"
                                    >
                                        Seleccionar Archivos
                                    </label>
                                    <input
                                        type="file"
                                        id="images"
                                        onChange={handleFileChange}
                                        accept="image/*"
                                        multiple
                                        style={{ display: "none" }}
                                    />
                                    {errors.images && (
                                        <div className="text-red-600">
                                            {errors.images}
                                        </div>
                                    )}
                                </div>

                                {/* Vista previa de las imágenes cargadas */}
                                {previewImages.length > 0 && (
                                    <div className="mt-4 grid grid-cols-3 gap-4">
                                        {previewImages.map((src, index) => (
                                            <div
                                                key={index}
                                                className="relative"
                                            >
                                                <img
                                                    src={src}
                                                    alt={`Vista previa ${
                                                        index + 1
                                                    }`}
                                                    className="w-32 h-32 object-cover rounded-md border"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeImage(index)
                                                    }
                                                    className="absolute top-1 right-1 bg-red-600 text-white text-xs rounded-full p-1 hover:bg-red-700 transition"
                                                >
                                                    &times;
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-600 transition"
                                >
                                    Crear Producto
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
