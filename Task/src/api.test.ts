// Unit testing 

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fetchMovies, fetchMovieDetails, Movie, MovieDetails } from './MovieService';

// Creating mock 
const mock = new MockAdapter(axios);

describe('API Functions', () => {
  
  afterEach(() => {
    mock.reset(); 
  });

  it('should fetch movies successfully', async () => {
    const movies: Movie[] = [
      { Title: 'Inception', Year: '2010', Poster: 'url1', imdbID: 'tt1375666' },
      { Title: 'The Matrix', Year: '1999', Poster: 'url2', imdbID: 'tt0133093' },
    ];

   
    mock.onGet('http://www.omdbapi.com/?apikey=76a76b17&s=Inception').reply(200, {
      Response: 'True',
      Search: movies,
    });

    const result = await fetchMovies('Inception');
    expect(result).toEqual(movies);
  });

  it('should handle no movies found', async () => {
    mock.onGet('http://www.omdbapi.com/?apikey=76a76b17&s=Unknown').reply(200, {
      Response: 'False',
      Search: [],
    });

    const result = await fetchMovies('Unknown');
    expect(result).toEqual([]);
  });

  it('should fetch movie details successfully', async () => {
    const movieDetails: MovieDetails = {
      Title: 'Inception',
      Year: '2010',
      Genre: 'Action, Adventure, Sci-Fi',
      imdbRating: '8.8',
      Plot: 'A thief who steals corporate secrets through the use of dream-sharing technology...',
      Poster: 'url1',
    };


    mock.onGet('http://www.omdbapi.com/?apikey=76a76b17&i=tt1375666').reply(200, {
      Response: 'True',
      ...movieDetails,
    });

    const result = await fetchMovieDetails('tt1375666');
    expect(result).toEqual(movieDetails);
  });

  it('should handle movie details not found', async () => {
    mock.onGet('http://www.omdbapi.com/?apikey=76a76b17&i=unknown').reply(200, {
      Response: 'False',
    });

    await expect(fetchMovieDetails('unknown')).rejects.toThrow('Movie not found');
  });

});
