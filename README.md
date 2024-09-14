# Movie App

Movie App is a cross-platform mobile application built with React Native, utilizing the [OMDb API](https://www.omdbapi.com/) to fetch and display movie information. This app allows users to search for movies, filter results, view detailed movie information, and save favorite movies locally.

## Features

- **Search & Filter**: Search movies by title and filter based on various criteria such as year, genre, or type.
- **Favorites**: Users can favorite movies, with selections saved locally for easy access.
- **Movie Details**: View detailed information about each movie, including plot, cast, ratings, and more.
- **Cross-Platform**: Compatible with both iOS and Android devices, offering a smooth user experience on each platform.

## Video Demonstration

Watch the video demonstration of the app here: [Movie App Demo](https://drive.google.com/file/d/1D9iia-1jpA01DP9ShFr5ROCPQHtVw9Sf/view?usp=sharing)

## Technologies Used

- **React Native**: The core framework for building the mobile app.
- **OMDb API**: The API used for fetching movie data.
- **AsyncStorage**: For local storage of favorited movies.
- **React Navigation**: Used for handling navigation between screens.
- **Axios**: For handling API requests.

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- React Native CLI or Expo CLI
- An OMDb API key (Get one from [OMDb API](https://www.omdbapi.com/apikey.aspx))

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/gurunatha14/react-native-movie-app.git
   cd react-native-movie-app

2. Install dependencies:
   ```bash
   npm install
   
3. Add your OMDb API key in MovieService.tsx:
   ```bash
   API_KEY=your_omdb_api_key


4. Run the app:
   
   1.For iOS:
   ```bash
   npx react-native run-ios
   ```
   2.For Android:
   ```bash
   npx react-native run-android


## Usage

- Launch the app, and the splash screen will appear.
- Search for movies by entering a title in the search bar.
- Filter results using options for year, genre, or type.
- View detailed information about each movie by tapping on it.
- Favorite movies and view them in the "Favorites" section, with data saved locally.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## Contact

For any questions or feedback, please contact [guruokali14@gmail.com.com](mailto:guruokali14@gmail.com).
