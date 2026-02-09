<?php

use App\Http\Controllers\CatalogController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;



Route::get('/', [HomeController::class, 'getHome']);

// Redireccion de la pantalla home a catalogo.
Route::redirect('/', '/catalog');

Route::get('/login', function () {
    return view('login');
});

Route::get('/logout', function () {
    return 'User Logout';
});

Route::get('/catalog', [CatalogController::class, 'getIndex']);

Route::get('/catalog/show/{id}', [CatalogController::class, 'getShow']);

Route::get('/catalog/create', [CatalogController::class, 'getCreate']);

Route::get('/catalog/edit/{id}', [CatalogController::class, 'getEdit']);

// NO FUNCIONAN
Route::put('/catalog/edit/{id}', [CatalogController::class, 'putEdit']);
Route::post('/catalog/create', [CatalogController::class, 'postCreate']);
