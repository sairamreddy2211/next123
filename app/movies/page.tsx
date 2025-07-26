"use client";

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

// OMDb API configuration (free, no auth required)
const OMDB_API_KEY = 'bf7b3c7'; // Free public key
const OMDB_BASE_URL = 'https://www.omdbapi.com/';

// Types for movie data
interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
  Plot?: string;
  Director?: string;
  Actors?: string;
  Genre?: string;
  imdbRating?: string;
  Runtime?: string;
}

interface MovieSearchResponse {
  Search: Movie[];
  totalResults: string;
  Response: string;
}

interface MovieDetailsResponse extends Movie {
  Response: string;
}

// API functions
const searchMovies = async (searchTerm: string, page: number = 1): Promise<MovieSearchResponse> => {
  const response = await fetch(
    `${OMDB_BASE_URL}?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(searchTerm)}&page=${page}`
  );
  
  if (!response.ok) {
    throw new Error('Failed to search movies');
  }
  
  const data = await response.json();
  
  if (data.Response === 'False') {
    throw new Error(data.Error || 'Movie not found');
  }
  
  return data;
};

const getMovieDetails = async (imdbID: string): Promise<MovieDetailsResponse> => {
  const response = await fetch(
    `${OMDB_BASE_URL}?apikey=${OMDB_API_KEY}&i=${imdbID}&plot=full`
  );
  
  if (!response.ok) {
    throw new Error('Failed to get movie details');
  }
  
  const data = await response.json();
  
  if (data.Response === 'False') {
    throw new Error(data.Error || 'Movie not found');
  }
  
  return data;
};

// Custom hooks using TanStack Query
const useMovieSearch = (searchTerm: string, page: number = 1) => {
  return useQuery({
    queryKey: ['movies', 'search', searchTerm, page],
    queryFn: () => searchMovies(searchTerm, page),
    enabled: searchTerm.length > 2, // Only search if term is > 2 characters
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    retry: 2,
  });
};

const useMovieDetails = (imdbID: string | null) => {
  return useQuery({
    queryKey: ['movies', 'details', imdbID],
    queryFn: () => getMovieDetails(imdbID!),
    enabled: !!imdbID, // Only fetch if imdbID exists
    staleTime: 10 * 60 * 1000, // Movie details change rarely
  });
};

export default function MoviesPage() {
  const [searchTerm, setSearchTerm] = useState('Marvel');
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Search movies with TanStack Query
  const { 
    data: searchResults, 
    isLoading: isSearching, 
    error: searchError,
    isFetching: isSearchFetching 
  } = useMovieSearch(searchTerm, currentPage);

  // Get movie details with TanStack Query
  const { 
    data: movieDetails, 
    isLoading: isLoadingDetails, 
    error: detailsError 
  } = useMovieDetails(selectedMovieId);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    setSelectedMovieId(null);
  };

  const handleMovieSelect = (imdbID: string) => {
    setSelectedMovieId(imdbID);
  };

  const totalPages = searchResults ? Math.ceil(parseInt(searchResults.totalResults) / 10) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="px-6 py-16 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            🎬 Movies Database
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Demonstrating TanStack Query with real API calls to OMDb (Open Movie Database)
          </p>
        </div>

        {/* TanStack Query Features Demo */}
        <div className="bg-white rounded-lg p-6 mb-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            🚀 TanStack Query Features in Action
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Smart Caching</h3>
              <p className="text-blue-700">Search results are cached for 5 minutes. Try searching the same term again!</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-2">Background Updates</h3>
              <p className="text-green-700">Data updates in background while showing cached results first.</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="font-semibold text-purple-900 mb-2">Loading States</h3>
              <p className="text-purple-700">Automatic loading indicators and error handling.</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <h3 className="font-semibold text-orange-900 mb-2">Query Keys</h3>
              <p className="text-orange-700">Intelligent query invalidation based on dependencies.</p>
            </div>
          </div>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-lg p-6 mb-8 shadow-lg">
          <form onSubmit={handleSearch} className="flex gap-4 items-end">
            <div className="flex-1">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Search Movies
              </label>
              <input
                id="search"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Enter movie title (e.g., Marvel, Batman, Star Wars)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              disabled={isSearching || searchTerm.length < 3}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              {isSearching ? 'Searching...' : 'Search'}
            </button>
          </form>

          {/* Query Status */}
          <div className="mt-4 flex items-center gap-4 text-sm">
            <span className={`px-3 py-1 rounded-full ${
              isSearching ? 'bg-blue-100 text-blue-800' : 
              isSearchFetching ? 'bg-yellow-100 text-yellow-800' :
              'bg-green-100 text-green-800'
            }`}>
              {isSearching ? '🔄 Initial Load' : 
               isSearchFetching ? '⚡ Background Update' : 
               '✅ Ready'}
            </span>
            {searchResults && (
              <span className="text-gray-600">
                Found {searchResults.totalResults} results
              </span>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Search Results */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Search Results</h2>
              
              {/* Error State */}
              {searchError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <h3 className="text-red-800 font-semibold mb-2">Search Error</h3>
                  <p className="text-red-700">{searchError.message}</p>
                </div>
              )}

              {/* Loading State */}
              {isSearching && (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                  <span className="ml-4 text-gray-600">Searching movies...</span>
                </div>
              )}

              {/* Results Grid */}
              {searchResults?.Search && (
                <>
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    {searchResults.Search.map((movie) => (
                      <div
                        key={movie.imdbID}
                        onClick={() => handleMovieSelect(movie.imdbID)}
                        className={`cursor-pointer border-2 rounded-lg p-4 transition-all hover:shadow-lg ${
                          selectedMovieId === movie.imdbID 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex gap-4">
                          <img
                            src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder-movie.png'}
                            alt={movie.Title}
                            className="w-20 h-28 object-cover rounded"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/80x120/gray/white?text=No+Image';
                            }}
                          />
                          <div className="flex-1">
                            <h3 className="font-bold text-gray-900 mb-1">{movie.Title}</h3>
                            <p className="text-sm text-gray-600 mb-1">Year: {movie.Year}</p>
                            <p className="text-sm text-gray-600">Type: {movie.Type}</p>
                            {selectedMovieId === movie.imdbID && (
                              <span className="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                                Selected
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1 || isSearching}
                        className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50"
                      >
                        Previous
                      </button>
                      <span className="px-4 py-2 text-gray-600">
                        Page {currentPage} of {Math.min(totalPages, 100)}
                      </span>
                      <button
                        onClick={() => setCurrentPage(p => p + 1)}
                        disabled={currentPage >= Math.min(totalPages, 100) || isSearching}
                        className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              )}

              {/* No Results */}
              {searchResults?.Search?.length === 0 && !isSearching && (
                <div className="text-center py-12">
                  <p className="text-gray-600">No movies found. Try a different search term.</p>
                </div>
              )}
            </div>
          </div>

          {/* Movie Details */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-lg sticky top-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Movie Details</h2>
              
              {!selectedMovieId && (
                <div className="text-center py-12">
                  <p className="text-gray-600">Select a movie to see details</p>
                </div>
              )}

              {/* Details Loading */}
              {isLoadingDetails && (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <span className="ml-3 text-gray-600">Loading details...</span>
                </div>
              )}

              {/* Details Error */}
              {detailsError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-700">Failed to load movie details</p>
                </div>
              )}

              {/* Movie Details */}
              {movieDetails && (
                <div className="space-y-4">
                  <img
                    src={movieDetails.Poster !== 'N/A' ? movieDetails.Poster : 'https://via.placeholder.com/300x400/gray/white?text=No+Image'}
                    alt={movieDetails.Title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{movieDetails.Title}</h3>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-semibold">Year:</span> {movieDetails.Year}</p>
                      <p><span className="font-semibold">Genre:</span> {movieDetails.Genre}</p>
                      <p><span className="font-semibold">Director:</span> {movieDetails.Director}</p>
                      <p><span className="font-semibold">Runtime:</span> {movieDetails.Runtime}</p>
                      <p><span className="font-semibold">IMDB Rating:</span> {movieDetails.imdbRating}/10</p>
                      <p><span className="font-semibold">Actors:</span> {movieDetails.Actors}</p>
                    </div>
                    {movieDetails.Plot && (
                      <div className="mt-4">
                        <p className="font-semibold text-sm mb-1">Plot:</p>
                        <p className="text-gray-700 text-sm leading-relaxed">{movieDetails.Plot}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* API Info */}
        <div className="mt-8 bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">API Information</h3>
          <p className="text-gray-700 text-sm">
            This demo uses the OMDb API (Open Movie Database) to demonstrate TanStack Query features.
            The API provides movie information including posters, plots, ratings, and cast details.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Real API</span>
            <span className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full">No Auth Required</span>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">Cached Results</span>
            <span className="px-3 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">Error Handling</span>
          </div>
        </div>
      </div>
    </div>
  );
}
