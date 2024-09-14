// Main Screen in this showing all some movies by default choosing popular Horror Movies and Avengers etc

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Image,
  Button,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {fetchMovies} from './MovieService';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from './App';

type MovieListScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'MovieList'
>;

interface Movie {
  Title: string;
  Year: string;
  Poster: string;
  imdbID: string;
}

const MovieListScreen: React.FC = () => {
  const [horrorMovies, setHorrorMovies] = useState<Movie[]>([]);
  const [avengersMovies, setAvengersMovies] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation<MovieListScreenNavigationProp>();

  useEffect(() => {
    const initializeMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetching initial movies
        const horrorResults = await fetchMovies('horror');
        const avengersResults = await fetchMovies('avengers');
        setHorrorMovies(horrorResults);
        setAvengersMovies(avengersResults);
        // Load favorites
        loadFavorites();
      } catch (error) {
        setError('Failed to fetch initial movies');
      } finally {
        setLoading(false);
      }
    };

    initializeMovies();
  }, []);

  const loadFavorites = async () => {
    try {
      const favoritesJson = await AsyncStorage.getItem('favorites');
      const favoritesArray: string[] = favoritesJson
        ? JSON.parse(favoritesJson)
        : [];
      setFavorites(favoritesArray);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const results = await fetchMovies(searchQuery);
      setHorrorMovies(results); // after search in displaying result in the horror corousel
    } catch (error) {
      setError('Failed to fetch movies');
    } finally {
      setLoading(false);
    }
  };

  // to manage favorites
  const toggleFavorite = async (movieId: string) => {
    const isFavorite = favorites.includes(movieId);
    const updatedFavorites = isFavorite
      ? favorites.filter(id => id !== movieId)
      : [...favorites, movieId];

    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
    } catch (error) {
      console.error(error);
    }
  };

  const renderHorrorCarouselItem = ({item}: {item: Movie}) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('MovieDetails', {movieId: item.imdbID})
      }
      style={styles.horrorCarouselCardContainer}>
      <View style={styles.horrorCarouselCardBackground}>
        <Image
          source={{uri: item.Poster}}
          style={styles.horrorCarouselPoster}
        />
      </View>
    </TouchableOpacity>
  );

  const renderAvengersCarouselItem = ({item}: {item: Movie}) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('MovieDetails', {movieId: item.imdbID})
      }
      style={styles.avengersCarouselCardContainer}>
      <Image
        source={{uri: item.Poster}}
        style={styles.avengersCarouselPoster}
      />
    </TouchableOpacity>
  );

  const renderMovieItem = ({item}: {item: Movie}) => (
    <View style={styles.item}>
      <Image source={{uri: item.Poster}} style={styles.poster} />
      <View style={styles.details}>
        <Text style={styles.title}>{item.Title}</Text>
        <Text>{item.Year}</Text>
      </View>
      <Button
        title={favorites.includes(item.imdbID) ? 'Unfavorite' : 'Favorite'}
        onPress={() => toggleFavorite(item.imdbID)}
      />
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('MovieDetails', {movieId: item.imdbID})
        }>
        <Text style={styles.detailsButton}>Details</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for movies"
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={handleSearch}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <ScrollView>
          {/* Carousel for Horror Movies */}
          <View style={styles.carouselContainer}>
            <Text style={styles.carouselTitle}>Horror Movies</Text>
            <FlatList
              data={horrorMovies.slice(0, 10)} //first 10 items
              keyExtractor={item => item.imdbID}
              renderItem={renderHorrorCarouselItem}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.carousel}
            />
          </View>

          {/* Carousel for Avengers Movies */}
          <View style={styles.carouselContainer}>
            <Text style={styles.carouselTitle}>Avengers Movies</Text>
            <FlatList
              data={avengersMovies.slice(0, 10)} // first 10 items
              keyExtractor={item => item.imdbID}
              renderItem={renderAvengersCarouselItem}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.carousel}
            />
          </View>

          {/* Search results */}
          <FlatList
            data={horrorMovies} // Showing results based on user search
            keyExtractor={item => item.imdbID}
            renderItem={renderMovieItem}
            style={styles.movieList}
          />
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  carouselContainer: {
    marginBottom: 20,
  },
  carouselTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  carousel: {
    height: 250,
  },
  horrorCarouselCardContainer: {
    marginRight: 15,
  },
  horrorCarouselCardBackground: {
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  horrorCarouselPoster: {
    width: 180,
    height: 250,
    borderRadius: 10,
  },
  avengersCarouselCardContainer: {
    marginRight: 15,
  },
  avengersCarouselPoster: {
    width: 150,
    height: 220,
    borderRadius: 10,
  },
  movieList: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
  },
  poster: {
    width: 70,
    height: 100,
    borderRadius: 5,
  },
  details: {
    marginLeft: 10,
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  detailsButton: {
    color: 'blue',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default MovieListScreen;
