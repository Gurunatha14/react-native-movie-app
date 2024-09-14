

import axios from 'axios';

// Defining APi
const apiKey = '76a76b17'; 
const baseURL = 'http://www.omdbapi.com/';


export interface Movie {
  Title: string;
  Year: string;
  Poster: string;
  imdbID: string;
}

export interface MovieDetails {
  Title: string;
  Year: string;
  Genre: string;
  imdbRating: string;
  Plot: string;
  Poster: string;
  Reviews?: Review[];
  TrailerURL?: string;
}

export interface Review {
    author: string;
    content: string;
  }

// Fetching a list of movies based on the search query
export const fetchMovies = async (query: string): Promise<Movie[]> => {
  try {
    const response = await axios.get(`${baseURL}?apikey=${apiKey}&s=${query}`);
    
    // to check list of moview is array or not
    if (response.data.Response === 'True' && Array.isArray(response.data.Search)) {
      return response.data.Search as Movie[];
    } else {
      return []; // no results found
    }
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw new Error('Failed to fetch movies');
  }
};

// Fetching single movie by ID
export const fetchMovieDetails = async (id: string): Promise<MovieDetails> => {
  try {
    const response = await axios.get(`${baseURL}?apikey=${apiKey}&i=${id}`);
    
  
    if (response.data.Response === 'True') {
      return response.data as MovieDetails;
    } else {
      throw new Error('Movie not found');
    }
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw new Error('Failed to fetch movie details');
  }
};
