
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

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

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const stripHtml = (html: string) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 group overflow-hidden">
      <div className="relative overflow-hidden">
        {movie.image?.medium ? (
          <img
            src={movie.image.medium}
            alt={movie.name}
            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-64 bg-slate-700 flex items-center justify-center">
            <span className="text-slate-400 text-sm">No Image Available</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-4 space-y-3">
        <h3 className="text-lg font-semibold text-white line-clamp-1 group-hover:text-blue-400 transition-colors">
          {movie.name}
        </h3>
        
        {movie.genres.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {movie.genres.slice(0, 2).map((genre, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full border border-blue-500/30"
              >
                {genre}
              </span>
            ))}
          </div>
        )}
        
        {movie.rating?.average && (
          <div className="flex items-center space-x-2">
            <span className="text-yellow-400 text-sm">★</span>
            <span className="text-slate-300 text-sm">{movie.rating.average}/10</span>
          </div>
        )}
        
        {movie.summary && (
          <p className="text-slate-400 text-sm line-clamp-2">
            {stripHtml(movie.summary)}
          </p>
        )}
        
        <Link to={`/movie/${movie.id}`}>
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors duration-200">
            View Movie
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default MovieCard;
