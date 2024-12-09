<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\JsonResponse as HttpJsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\JsonResponse;



class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
{
    //
        return Inertia::render('Product/index', [
            //
        ]);
}


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return Inertia::render('Product/create', [
            //
        ]);

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        return Inertia::render('Product/show', [
            //
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
    
    return Inertia::render('Product/Create', [
       
    ]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
