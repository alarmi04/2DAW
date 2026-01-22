@extends('layouts.master')

@section('content')
<div class="row">
    <div class="col-sm-4">
        <img src="{{ $pelicula['poster'] }}" style="height:200px;" />
    </div>
    <div class="col-sm-8">
        <h2>{{ $pelicula['title'] }}</h2>
        <p style="font-size:1.3rem;">Año: {{ $pelicula['year'] }}<br>Director: {{ $pelicula['director'] }}</p>
        <p><span style="font-weight:bold;">Resumen: </span>{{ $pelicula['synopsis'] }}</p>
        @if ($pelicula['rented'] === 1)
            <p><span style="font-weight:bold;">Estado: </span>Película actualmente alquilada</p>
            <button type="button" class="btn btn-danger">Devolver pelicula</button>
            <a href="{{ url('/catalog/edit/' . $id) }}">
                <button type="button" class="btn btn-warning" style="color:white;">Editar pelicula</button>
            </a>
            <a href="{{ url('/catalog') }}">
                <button type="button" class="btn btn-outline-secondary" style="color:black;" onclick={{ url('/catalog') }}>Volver al listado</button>
            </a>
        @else
            <p><span style="font-weight:bold;">Estado: </span>Pelicula disponible</p>
            <a href="{{ url('/catalog/edit/' . $id) }}">
                <button type="button" class="btn btn-warning" style="color:white;">Editar pelicula</button>
            </a>
            <a href="{{ url('/catalog') }}">
                <button type="button" class="btn btn-outline-secondary" style="color:black;" onclick={{ url('/catalog') }}>Volver al listado</button>
            </a>
        @endif

    </div>
</div>
@stop