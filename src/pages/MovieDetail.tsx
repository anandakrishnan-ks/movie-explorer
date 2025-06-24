
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Header from '@/components/Header';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft } from 'lucide-react';

interface MovieDetailData {
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
  language: string;
  premiered: string;
  status: string;
  runtime: number;
  network?: {
    name: string;
    country: {
      name: string;
    };
  };
}

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      if (!id) return;
      
      try {
        console.log(`Fetching movie details for ID: ${id}`);
        const response = await axios.get(`https://api.tvmaze.com/shows/${id}`);
        console.log('Movie details fetched:', response.data);
        setMovie(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching movie details:', err);
        setError('Failed to fetch movie details. Please try again later.');
        setLoading(false);
      }
    };

    fetchMovieDetail();
  }, [id]);

  const stripHtml = (html: string) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <Skeleton className="w-full h-96 bg-slate-700 rounded-lg" />
            </div>
            <div className="lg:col-span-2 space-y-4">
              <Skeleton className="h-8 w-3/4 bg-slate-700" />
              <Skeleton className="h-4 w-1/2 bg-slate-700" />
              <Skeleton className="h-20 w-full bg-slate-700" />
              <div className="flex space-x-2">
                <Skeleton className="h-6 w-16 bg-slate-700" />
                <Skeleton className="h-6 w-20 bg-slate-700" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-red-400">
            <h2 className="text-2xl font-bold mb-4">Movie Not Found</h2>
            <p className="mb-4">{error || 'The requested movie could not be found.'}</p>
            <Link to="/">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Movies
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-block mb-6">
          <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Movies
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Movie Poster */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {movie.image?.original ? (
                <img
                  src={movie.image.original}
                  alt={movie.name}
                  className="w-full rounded-lg shadow-2xl shadow-black/50"
                />
              ) : (
                <div className="w-full h-96 bg-slate-700 rounded-lg flex items-center justify-center">
                  <span className="text-slate-400">No Image Available</span>
                </div>
              )}
            </div>
          </div>

          {/* Movie Details */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-4">{movie.name}</h1>
              
              <div className="flex flex-wrap items-center gap-4 mb-6">
                {movie.rating?.average && (
                  <div className="flex items-center space-x-2 bg-yellow-500/20 px-3 py-1 rounded-full border border-yellow-500/30">
                    <span className="text-yellow-400 text-lg">★</span>
                    <span className="text-yellow-300 font-medium">{movie.rating.average}/10</span>
                  </div>
                )}
                
                {movie.language && (
                  <Badge variant="outline" className="border-slate-600 text-slate-300">
                    {movie.language}
                  </Badge>
                )}
                
                {movie.runtime && (
                  <Badge variant="outline" className="border-slate-600 text-slate-300">
                    {movie.runtime} min
                  </Badge>
                )}
                
                {movie.status && (
                  <Badge variant="outline" className="border-slate-600 text-slate-300">
                    {movie.status}
                  </Badge>
                )}
              </div>

              {movie.genres.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-2">Genres</h3>
                  <div className="flex flex-wrap gap-2">
                    {movie.genres.map((genre, index) => (
                      <Badge
                        key={index}
                        className="bg-blue-500/20 text-blue-300 border border-blue-500/30 hover:bg-blue-500/30"
                      >
                        {genre}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {movie.summary && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-2">Summary</h3>
                  <p className="text-slate-300 leading-relaxed text-lg">
                    {stripHtml(movie.summary)}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                {movie.premiered && (
                  <div>
                    <span className="text-slate-400">Premiered:</span>
                    <span className="text-white ml-2">{new Date(movie.premiered).toLocaleDateString()}</span>
                  </div>
                )}
                
                {movie.network && (
                  <div>
                    <span className="text-slate-400">Network:</span>
                    <span className="text-white ml-2">
                      {movie.network.name} ({movie.network.country.name})
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MovieDetail;
