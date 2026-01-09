<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return 'Main Page';
});

Route::get('/Login', function () {
    return 'User Login';
});

Route::get('/Logout', function () {
    return 'User Logout';
});

Route::get('/Catalog', function () {
    return 'Movie list';
});

Route::get('/Catalog/show/{id}', function ($id) {
    return 'Detail view of the movie ' . $id;
});

Route::get('/Catalog/create', function () {
    return 'Add movie';
});

Route::get('/Catalog/edit/{id}', function ($id) {
    return 'Edit movie '.$id;
});
