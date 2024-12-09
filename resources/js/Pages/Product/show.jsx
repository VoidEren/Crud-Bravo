import { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Dashboard() {
    const [active, setActive] = useState("Productos");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    const menuItems = [
        { name: "Inicio", icon: "🏠" },
        { name: "Página", icon: "📄" },
        { name: "Productos", icon: "📦" },
        { name: "Pagos", icon: "💳" },
        { name: "Ajustes", icon: "⚙" },
    ];

    const products = [
        {
            id: 1,
            image: "https://via.placeholder.com/50",
            name: "Producto 1",
            description: "Descripción del producto 1",
            price: "$10.00",
            category: "Categoría A",
            brand: "Marca X",
        },
        {
            id: 2,
            image: "https://via.placeholder.com/50",
            name: "Producto 2",
            description: "Descripción del producto 2",
            price: "$20.00",
            category: "Categoría B",
            brand: "Marca Y",
        },
    ];

    const handleDeleteClick = (product) => {
        setProductToDelete(product);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        console.log("Producto eliminado:", productToDelete);
        setShowDeleteModal(false);
        setProductToDelete(null);
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-[#f5f5f5]">
            <aside className="w-full md:w-64 h-auto md:h-screen bg-white shadow-lg flex flex-col justify-between sticky md:top-0">
                <div className="p-6 flex flex-col items-center mt-4">
                    <img
                        src="https://via.placeholder.com/80"
                        alt="Admin Profile"
                        className="rounded-full w-20 h-20 mb-4"
                    />
                    <h2 className="text-lg font-semibold text-[#111827]">
                        Jose Luis Coca
                    </h2>
                    <p className="text-sm text-[#818ef8]">Admin</p>
                </div>

                <nav className="mt-10 flex flex-col gap-4">
                    {menuItems.map((item) => (
                        <div
                            key={item.name}
                            onClick={() => setActive(item.name)}
                            className={`flex items-center px-6 py-3 text-sm font-medium cursor-pointer transition duration-200 transform ${
                                active === item.name
                                    ? "text-[#FFFFFF] bg-[#111827] border-l-8 border-[#4338ca] rounded-lg translate-x-2 shadow-md"
                                    : "text-[#374151] hover:bg-[#f0f0f0]"
                            }`}
                        >
                            <span className="mr-3">{item.icon}</span>
                            {item.name}
                        </div>
                    ))}
                </nav>

                <button className="w-full px-6 py-3 text-left text-sm text-[#374151] bg-transparent hover:bg-red-200 active:bg-red-400 transition duration-200 ease-in-out hover:opacity-80">
                    Cerrar Sesión 🔒
                </button>
            </aside>

            <main className="flex-1 p-4 md:p-8 overflow-y-auto">
                <header className="flex justify-between items-center mb-6">
                    <h1 className="text-xl md:text-2xl font-semibold text-[#111827]">
                        Productos
                    </h1>
                    <Link
                        href={route("product.create")}
                        className="flex items-center gap-2 px-4 py-2 bg-[#111827] text-white rounded-lg transition-transform duration-300 ease-in-out text-sm font-semibold tracking-wider uppercase hover:bg-[#374151] hover:shadow-md active:border active:border-[#818ef8]"
                    >
                        Agregar Producto
                    </Link>
                </header>

                <div className="bg-white shadow-lg rounded-lg overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className="bg-[#f5f5f5] text-left">
                                <th className="py-2 px-2 md:py-3 md:px-4 text-xs md:text-sm font-medium text-[#111827]">
                                    Imagen
                                </th>
                                <th className="py-2 px-2 md:py-3 md:px-4 text-xs md:text-sm font-medium text-[#111827]">
                                    Nombre
                                </th>
                                <th className="py-2 px-2 md:py-3 md:px-4 text-xs md:text-sm font-medium text-[#111827]">
                                    Descripción
                                </th>
                                <th className="py-2 px-2 md:py-3 md:px-4 text-xs md:text-sm font-medium text-[#111827]">
                                    Precio
                                </th>
                                <th className="py-2 px-2 md:py-3 md:px-4 text-xs md:text-sm font-medium text-[#111827]">
                                    Categoría
                                </th>
                                <th className="py-2 px-2 md:py-3 md:px-4 text-xs md:text-sm font-medium text-[#111827]">
                                    Marca
                                </th>
                                <th className="py-2 px-2 md:py-3 md:px-4 text-xs md:text-sm font-medium text-[#111827] w-24">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr
                                    key={product.id}
                                    className="border-b hover:bg-[#f0f0f0] transition duration-200"
                                >
                                    <td className="py-2 px-2 md:py-3 md:px-4">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-8 h-8 md:w-10 md:h-10 rounded"
                                        />
                                    </td>
                                    <td className="py-2 px-2 md:py-3 md:px-4 text-[#111827]">
                                        {product.name}
                                    </td>
                                    <td className="py-2 px-2 md:py-3 md:px-4 text-[#374151]">
                                        {product.description}
                                    </td>
                                    <td className="py-2 px-2 md:py-3 md:px-4 text-[#111827] font-semibold">
                                        {product.price}
                                    </td>
                                    <td className="py-2 px-2 md:py-3 md:px-4 text-[#374151]">
                                        {product.category}
                                    </td>
                                    <td className="py-2 px-2 md:py-3 md:px-4 text-[#374151]">
                                        {product.brand}
                                    </td>
                                    <td className="py-2 px-2 md:py-3 md:px-4 flex flex-col md:flex-row gap-2 items-center w-24">
                                        <Link
                                            href={route("product.create", {
                                                product: product,
                                            })}
                                            className="text-blue-500 hover:text-blue-700 transition duration-150 transform hover:scale-110 active:scale-95"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="size-6"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                                                />
                                            </svg>
                                        </Link>
                                        <button
                                            onClick={() =>
                                                handleDeleteClick(product)
                                            }
                                            className="text-red-500 hover:text-red-700 transition duration-150 transform hover:scale-110 active:scale-95"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="size-6"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                                />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>

            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 w-11/12 md:w-96 transform transition-all scale-95">
                        <h2 className="text-lg font-semibold text-[#111827] mb-4">
                            ¿Eliminar Producto?
                        </h2>
                        <p className="text-sm text-[#374151] mb-6">
                            ¿Estás seguro de que deseas eliminar{" "}
                            <strong>{productToDelete.name}</strong>?
                        </p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="px-4 py-2 text-sm rounded-lg bg-gray-300 text-gray-700 hover:bg-gray-400 transition duration-150"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700 transition duration-150"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
