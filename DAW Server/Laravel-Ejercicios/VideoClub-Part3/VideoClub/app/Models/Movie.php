<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Movie extends Model
{
    //

    /**
     * La tabla asociada con el modelo.
     * @var string
     */
    protected $table = 'movies';

    /**
     * Campos a rellenar.
     * @var array
     */
    protected $fillable = ['title', 'year', 'director', 'poster', 'synopsis'];
}
