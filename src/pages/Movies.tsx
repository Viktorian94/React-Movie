import React, { useState } from 'react';
import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { fetchPopularMovies, searchMovies } from '../api/tmdbApi';
import useDebounce from '../hooks/useDebounce';

export interface Movie {
    id: number;
    title: string;
    poster_path: string;
  }

function Movies() {
  const queryClient = useQueryClient();
  const [likedMovies, setLikedMovies] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const { data: movies, isLoading, error } = useQuery({
    queryKey: ['movies', debouncedSearchQuery],
    queryFn: () =>
      debouncedSearchQuery
        ? searchMovies(debouncedSearchQuery)
        : fetchPopularMovies(),
  });

  const likeMutation = useMutation({
    mutationFn: (movieId: number) =>
      new Promise<void>((resolve) => setTimeout(resolve, 500)),
    onMutate: async (movieId: number) => {
      await queryClient.cancelQueries({ queryKey: ['movies'] });
      setLikedMovies((prev) => [...prev, movieId]);
    },
    onError: (err: any, movieId: number) => {
      setLikedMovies((prev) => prev.filter((id) => id !== movieId));
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['movies'] });
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error while loading films</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Movies</h1>
      <input
        type="text"
        placeholder="Поиск фильмов..."
        className="border p-2 mb-4 w-full"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {movies.map((movie: any) => (
          <div key={movie.id} className="border p-2 rounded">
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              className="mb-2 w-full h-auto"
            />
            <h2 className="text-lg font-bold">{movie.title}</h2>
            <button
              onClick={() => likeMutation.mutate(movie.id)}
              className={`mt-2 px-4 py-2 rounded ${
                likedMovies.includes(movie.id)
                  ? 'bg-red-500'
                  : 'bg-blue-500'
              } text-white`}
            >
              {likedMovies.includes(movie.id) ? 'Liked' : 'Like'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Movies;
