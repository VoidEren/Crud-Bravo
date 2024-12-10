<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;


class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::all(); // Puedes agregar paginación aquí si es necesario
        return Inertia::render('Product/Index', [
            'products' => $products,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = DB::table('categories')->get(); // Asegúrate de tener una tabla de categorías
        $brands = DB::table('brands')->get(); // Asegúrate de tener una tabla de marcas

        return Inertia::render('Product/create', [
            'categories' => $categories,
            'brands' => $brands,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
{
    // Validación de los datos
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'description' => 'nullable|string',
        'price' => 'required|numeric|min:0',
        'category' => 'required|exists:categories,id', // Asegura que la categoría exista
        'brand' => 'required|exists:brands,id', // Asegura que la marca exista
        'stock' => 'required|integer|min:0',
        'sku' => 'required|string|unique:products,sku', // Verifica que el SKU sea único
        'images.*' => 'nullable|image|mimes:jpg,png,jpeg,gif|max:2048', // Se asegura que las imágenes sean correctas
    ]);

    // Crear el producto
    $product = Product::create([
        'name' => $validated['name'],
        'description' => $validated['description'] ?? null, // Asegura que description pueda ser nula
        'price' => $validated['price'],
        'category_id' => $validated['category'], // Relación con la categoría
        'brand_id' => $validated['brand'], // Relación con la marca
        'stock' => $validated['stock'],
        'sku' => $validated['sku'],
    ]);

    // Subir las imágenes, si las hay
    if ($request->hasFile('images')) {
        foreach ($request->file('images') as $image) {
            $path = $image->store('products', 'public'); // Guardar imagen en el directorio public
            $product->images()->create(['path' => $path]); // Asociar imagen al producto
        }
    }

    // Redirigir con mensaje de éxito
    return redirect()->route('products.index')->with('success', 'Producto creado correctamente');
}


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $product = Product::findOrFail($id);
        return Inertia::render('Product/Show', [
            'product' => $product,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $product = Product::findOrFail($id);
        $categories = DB::table('categories')->get();
        $brands = DB::table('brands')->get();

        return Inertia::render('Product/Edit', [
            'product' => $product,
            'categories' => $categories,
            'brands' => $brands,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'category' => 'required|integer|exists:categories,id',
            'brand' => 'required|integer|exists:brands,id',
            'stock' => 'required|integer|min:0',
            'sku' => 'required|string|unique:products,sku,' . $id,
            'images.*' => 'image|mimes:jpg,png,jpeg,gif|max:2048',
        ]);

        $product = Product::findOrFail($id);
        $product->update($validated);

        if ($request->hasFile('images')) {
            $product->images()->delete(); // Borra imágenes existentes
            foreach ($request->file('images') as $image) {
                $path = $image->store('products', 'public');
                $product->images()->create(['path' => $path]);
            }
        }

        return redirect()->route('products.index')->with('success', 'Producto actualizado correctamente');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $product = Product::findOrFail($id);
        $product->images()->delete(); // Borra imágenes relacionadas
        $product->delete();

        return redirect()->route('products.index')->with('success', 'Producto eliminado correctamente');
    }
}
