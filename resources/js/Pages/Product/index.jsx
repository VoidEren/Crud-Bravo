import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import { FaShoppingCart, FaShoppingBag, FaPlus, FaMinus } from "react-icons/fa"; 

// Producto específico
const product = {
    name: "Movado",
    sku: "42533560",
    price: "29,999.00",
    stock: 20,
    details: "Reloj Bold Hombre",
    description: "El reloj Movado Bold Hombre es una pieza elegante y moderna, diseñada para quienes aprecian el lujo y la precisión. Este modelo cuenta con una caja y bisel en acero inoxidable de alta calidad, complementados con un extensible tipo correa en el mismo material, lo que garantiza durabilidad y resistencia al desgaste diario. Su diseño en color plata le da un toque sofisticado que se adapta tanto a eventos formales como a uso cotidiano.",
    specifications: "Movimiento de cuarzo suizo, resistencia al agua hasta 30 metros.",
    detailsInfo: "Incluye garantía de 2 años y servicio de mantenimiento gratuito durante el primer año.",
    technicalData: "Diámetro de la caja: 40mm, grosor: 10mm, peso: 120g.",
    materials: "Acero inoxidable, vidrio de zafiro, correa de cuero genuino.",
    images: [
        { url: "https://www.elpalaciodehierro.com/dw/image/v2/BDKB_PRD/on/demandware.static/-/Sites-palacio-master-catalog/default/dwb76d0acd/images/42533560/large/42533560_x1.jpg?sw=960&sh=1152" },
        { url: "https://www.elpalaciodehierro.com/dw/image/v2/BDKB_PRD/on/demandware.static/-/Sites-palacio-master-catalog/default/dw5ab78d79/images/42533560/large/42533560_x2.jpg?sw=960&sh=1152" },
        { url: "https://www.elpalaciodehierro.com/dw/image/v2/BDKB_PRD/on/demandware.static/-/Sites-palacio-master-catalog/default/dw89c194cc/images/42533560/large/42533560_x3.jpg?sw=960&sh=1152" },
        { url: "https://www.elpalaciodehierro.com/dw/image/v2/BDKB_PRD/on/demandware.static/-/Sites-palacio-master-catalog/default/dw6b8ad4c1/images/42533560/large/42533560_x8.jpg?sw=960&sh=1152" }
    ]
};

// Componente Accordion para secciones desplegables
function Accordion({ title, content }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-200 py-4">
            <div
                className="flex justify-between items-center cursor-pointer hover:bg-gray-100 p-2 rounded"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h3 className="font-semibold text-lg">{title}</h3>
                <span>{isOpen ? "-" : "+"}</span>
            </div>
            {isOpen && (
                <div className="mt-2 text-gray-700">
                    {content}
                </div>
            )}
        </div>
    );
}

export default function ProductDetails() {
    const [quantity, setQuantity] = useState(1);
    const [mainImage, setMainImage] = useState(product.images[0].url);

    const handleAddToCart = () => {
        console.log("Producto añadido al carrito:", product);
    };

    const handleBuyNow = () => {
        console.log("Compra realizada:", product);
    };

    const increaseQuantity = () => {
        if (quantity < product.stock) {
            setQuantity(quantity + 1);
        }
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-bold text-3xl leading-tight tracking-wider" style={{ color: "#333333" }}>
                    {product.name}
                </h2>
            }
        >
            <Head title={product.name} />

            <div className="py-8">
                <div className="max-w-5xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6" style={{ backgroundColor: "#FFFFFF" }}>
                        <div className="flex gap-6 flex-col md:flex-row">
                            <div className="flex">
                                <div className="flex flex-col gap-2 mr-4">
                                    {product.images.map((image, index) => (
                                    <img
                                    key={index}
                                    src={image.url}
                                    alt={`Product Image ${index + 1}`}
                                    className="w-16 h-16 object-contain border-2 rounded-lg cursor-pointer transition-transform duration-200 transform hover:scale-110 bg-gray-100 hover:bg-gray-200"
                                    style={{ borderColor: "#818ef8" }}
                                    onClick={() => setMainImage(image.url)}
                                />
                                ))}
                                </div>
                                <img
                                    src={mainImage}
                                    alt="Main Product Image"
                                    className="w-full h-80 object-contain rounded-lg"
                                    style={{ borderColor: "#818ef8" }}
                                />
                            </div>


                        <div className=" p-10 rounded-lg bg-white shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] 
                        hover:text-black/70 hover:ring-black/20 focus:outline-none focus-visible:ring-[#FF2D20] 
                        lg:pb-10">

                            <div className="flex-1">
                                <h1 className="text-3xl font-bold mb-2 tracking-tight" style={{ color: "#333333" }}>{product.name}</h1>
                                <p className="text-gray-500 mb-4 text-sm font-medium uppercase" style={{ color: "#666666" }}>SKU: {product.sku}</p>
                                <p className="text-2xl font-extrabold mb-4" style={{ color: "#000000" }}>
                                    ${product.price} MXN <span className="text-lg font-normal">(IVA incluido)</span>
                                </p>
                                <p className="mb-4 text-sm font-medium" style={{ color: "#666666" }}>
                                    Cantidad disponible: {product.stock}
                                </p>
                                <p className="mb-6 text-lg font-light italic" style={{ color: "#333333" }}>{product.details}</p>

                                <div className="flex items-center mb-6">
                                    <label className="mr-2 font-semibold text-lg" style={{ color: "#333333" }}>Cantidad:</label>
                                    <button onClick={decreaseQuantity} className="p-2">
                                        <FaMinus />
                                    </button>
                                    <input
                                        type="number"
                                        min="1"
                                        max={product.stock}
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                        className="border p-2 w-16 text-center transition-all duration-200 ease-in-out"
                                        style={{ borderColor: "#CCCCCC" }}
                                    />
                                    <button onClick={increaseQuantity} className="p-2 ">
                                        <FaPlus />
                                    </button>
                                </div>

                                <div className="flex gap-4">
                                    <button
                                        onClick={handleAddToCart}
                                        className="flex items-center gap-2 px-4 py-2 rounded transition-transform duration-300 ease-in-out text-sm font-semibold tracking-wider uppercase"
                                        style={{
                                            backgroundColor: "#808080",
                                            color: "#FFFFFF",
                                            border: "none",
                                            cursor: "pointer",
                                            transition: "background-color 0.2s",
                                        }}
                                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#666666"}
                                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#808080"}
                                    >
                                        <FaShoppingCart />
                                        Añadir al carrito
                                    </button>
                                    <button
                                        onClick={handleBuyNow}
                                        className="flex items-center gap-2 px-4 py-2 rounded transition-transform duration-300 ease-in-out text-sm font-semibold tracking-wider uppercase"
                                        style={{
                                            backgroundColor: "#000000",
                                            color: "#FFFFFF",
                                            border: "#818ef8",
                                            cursor: "pointer",
                                            transition: "background-color 0.2s",
                                        }}
                                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#333333"}
                                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#000000"}
                                    >
                                        <FaShoppingBag />
                                        Comprar ahora
                                    </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Descripción del producto (siempre visible) */}
                        <div className="mt-8">
                            <h3 className="text-lg font-semibold mb-2" style={{ color: "#333333" }}>Descripción del producto:</h3>
                            <p className="text-gray-700">{product.description}</p>
                        </div>

                        {/* Secciones desplegables */}
                        <div className="mt-8">
                            <Accordion title="Especificaciones" content={product.specifications} />
                            <Accordion title="Detalles" content={product.detailsInfo} />
                            <Accordion title="Ficha técnica" content={product.technicalData} />
                            <Accordion title="Materiales" content={product.materials} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
