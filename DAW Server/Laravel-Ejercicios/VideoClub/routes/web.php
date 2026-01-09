<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('home');
});

Route::get('/Login', function () {
    return view('login');
});

Route::get('/Logout', function () {
    return 'User Logout';
});

Route::get('/Catalog', function () {
    return view('catalog');
});

Route::get('/Catalog/show/{id}', function ($id) {
    return view('catalog_show', array('id' => $id));
});

Route::get('/Catalog/create', function () {
    return view('catalog_create');
});

Route::get('/Catalog/edit/{id}', function ($id) {
    return view('catalog_edit', array('id' => $id));
});
