
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '@/components/Header';
import MovieCard from '@/components/MovieCard';
import { Skeleton } from '@/components/ui/skeleton';

interface Movie {
  id: number;
  name: string;
  image?: {
    medium: string;
    original: string;
  };
  genres: string[];
  summary: string;
  rating?: {
    average: number;
  };
}

const Index = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        console.log('Fetching movies from API...');
        const response = await axios.get('https://api.tvmaze.com/shows');
        console.log('Movies fetched successfully:', response.data.length);
        setMovies(response.data.slice(0, 24)); // Limit to 24 movies for better performance
        setLoading(false);
      } catch (err) {
        console.error('Error fetching movies:', err);
        setError('Failed to fetch movies. Please try again later.');
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, index) => (
              <div key={index} className="space-y-4">
                <Skeleton className="h-64 w-full bg-slate-700" />
                <Skeleton className="h-4 w-3/4 bg-slate-700" />
                <Skeleton className="h-4 w-1/2 bg-slate-700" />
                <Skeleton className="h-10 w-full bg-slate-700" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-red-400">
            <h2 className="text-2xl font-bold mb-4">Oops! Something went wrong</h2>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Discover Movies & Shows</h2>
          <p className="text-slate-400">Explore our collection of amazing movies and TV shows</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;
