import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Button,
  TextInput,
  StyleSheet,
  Alert,
  Linking,
} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {fetchMovieDetails, MovieDetails, Review} from './MovieService';
import {RootStackParamList} from './App';
import Icon from 'react-native-vector-icons/MaterialIcons';

type MovieDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  'MovieDetails'
>;
type MovieDetailsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'MovieDetails'
>;

interface MovieDetailsScreenProps {
  route: MovieDetailsScreenRouteProp;
  navigation: MovieDetailsScreenNavigationProp;
}

const MovieDetailsScreen: React.FC<MovieDetailsScreenProps> = ({route}) => {
  const {movieId} = route.params;
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [review, setReview] = useState<string>('');
  const [rating, setRating] = useState<number | null>(null);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const details = await fetchMovieDetails(movieId);
        setMovie(details);
      } catch (error) {
        console.error(error);
      }
    };

    getMovieDetails();
  }, [movieId]);

  // Simply added in our api url for trailer is not provided
  const handleWatchTrailer = () => {
    if (movie?.TrailerURL) {
      Linking.openURL(movie.TrailerURL);
    } else {
      Alert.alert('Trailer not found');
    }
  };

  // To submit review we can handle review can be send to backend but curently just verifying on console
  const handleSubmitReview = () => {
    if (review && rating !== null) {
      const newReview: Review = {
        author: 'User',
        content: `${review} (Rating: ${rating})`,
      };

      console.log('Review submitted:', newReview);
      Alert.alert('Thank you for your Review');
      // Reset form
      setReview('');
      setRating(null);
    } else {
      Alert.alert('Please enter a review and select a rating');
    }
  };

  if (!movie) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{uri: movie.Poster}} style={styles.poster} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{movie.Title}</Text>
        <Text>Year: {movie.Year}</Text>
        <Text>Genre: {movie.Genre}</Text>
        <Text>Rating: {movie.imdbRating}</Text>
        <Text>Plot: {movie.Plot}</Text>

        {movie.Reviews && movie.Reviews.length > 0 && (
          <View style={styles.reviewsContainer}>
            <Text style={styles.reviewsTitle}>Reviews:</Text>
            {movie.Reviews.map((review, index) => (
              <View key={index} style={styles.review}>
                <Text style={styles.reviewAuthor}>{review.author}:</Text>
                <Text>{review.content}</Text>
              </View>
            ))}
          </View>
        )}

        <Button title="Watch Trailer" onPress={handleWatchTrailer} />

        <View style={styles.reviewForm}>
          <Text style={styles.reviewFormTitle}>Add Your Review:</Text>
          <TextInput
            style={styles.reviewInput}
            placeholder="Write your review here..."
            value={review}
            onChangeText={setReview}
          />
          <View style={styles.ratingContainer}>
            <Text>Rating: </Text>
            {[1, 2, 3, 4, 5].map(star => (
              <Icon
                key={star}
                name={star <= (rating || 0) ? 'star' : 'star-border'}
                size={24}
                color="gold"
                onPress={() => setRating(star)}
                style={styles.starIcon}
              />
            ))}
          </View>
          <Button title="Submit Review" onPress={handleSubmitReview} />
        </View>
      </View>
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
  },
  poster: {
    width: '100%',
    height: 300,
  },
  detailsContainer: {
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  reviewsContainer: {
    marginVertical: 10,
  },
  reviewsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  review: {
    marginBottom: 10,
  },
  reviewAuthor: {
    fontWeight: 'bold',
  },
  reviewForm: {
    marginVertical: 20,
  },
  reviewFormTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  reviewInput: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    marginHorizontal: 5,
  },
});

export default MovieDetailsScreen;
