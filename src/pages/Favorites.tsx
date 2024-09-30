import React, { useEffect, useState } from 'react';
import { Movie } from './Movies';

function Favorites() {
  const [likedMovies, setLikedMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const storedMovies = localStorage.getItem('likedMovies');
    if (storedMovies) {
      setLikedMovies(JSON.parse(storedMovies));
    }
  }, []);

  if (likedMovies.length === 0) {
    return <p>Empty.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Избранные фильмы</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {likedMovies.map((movie) => (
          <div key={movie.id} className="border p-2 rounded">
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              className="mb-2 w-full h-auto"
            />
            <h2 className="text-lg font-bold">{movie.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;
