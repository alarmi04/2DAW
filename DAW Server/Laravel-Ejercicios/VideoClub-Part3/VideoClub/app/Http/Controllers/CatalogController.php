<?php

namespace App\Http\Controllers;
use App\Models\Movie;
use Illuminate\Http\Request;
use function Laravel\Prompts\alert;

class CatalogController extends Controller
{

	public function getIndex()
	{
		$movies = Movie::all();
		return view('catalog', ['arrayPeliculas' => $movies]);
	}

	public function getShow($id)
	{
		$movie = Movie::find($id + 1);
		return view('catalog_show', array('pelicula' => $movie, 'id' => $id));
	}

	public function getCreate()
	{
		return view('catalog_create');
	}

	public function getEdit($id)
	{
		$movie = Movie::find($id + 1);
		return view('catalog_edit', array('pelicula' => $movie, 'id' => $id));
	}

	public function putEdit(Request $request, $id)
	{
		if (isset($request->title) && isset($request->year) && isset($request->director) && isset($request->poster) && isset($request->synopsis)) {
			$movie = Movie::find($id - 1);

			$title = $request->title;
			$year = $request->year;
			$director = $request->director;
			$poster = $request->poster;
			$synopsis = $request->synopsis;
			$movie->update(
				[
					'title' => $title,
					'year' => $year,
					'director' => $director,
					'poster' => $poster,
					'synopsis' => $synopsis
				]
			);
		}
		return redirect('/catalog');
	}

	public function postCreate(Request $request)
	{
		if (isset($request->title) && isset($request->year) && isset($request->director) && isset($request->poster) && isset($request->synopsis)) {
			$title = $request->title;
			$year = $request->year;
			$director = $request->director;
			$poster = $request->poster;
			$synopsis = $request->synopsis;

			$existe = Movie::where('title', '!=', $request->title)->exists();

			if ($existe) {
				return redirect('/catalog');
			}

			Movie::create(
				[
					'title' => $title,
					'year' => $year,
					'director' => $director,
					'poster' => $poster,
					'synopsis' => $synopsis
				]
			);
		}

		return redirect('/catalog');
	}

}