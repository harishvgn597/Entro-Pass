<template>
  <div class="home">
    <div class="user-profile" @click="openProfile">
    <img src="../assets/person_50dp__FILL0_wght400_GRAD0_opsz48.svg" alt="User Profile" class="profile-icon" />
  </div>
    <div class="header">
      
      <h1 class="title">Welcome to the Home Page</h1>
      <button class="logout-button" @click="logout">Logout</button>
    </div>
    <h2>Book a Movie for Awesomeness</h2>
    <div class="banners">
      <div class="banner" v-for="movie in movies" :key="movie.show_id" @click="handleBannerClick(movie)">
        <img :src="'data:image/jpeg;base64,' + movie.image" alt="Movie banner" />
        <h3>{{ movie.show_name }}</h3>
        
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      movies: [],
      username: this.$route.query.username,
    };
  },
  watch: {
    // Watch for changes in the route query parameters to update the username if needed
    '$route.query.username'(newUsername) {
      this.username = newUsername;
    },
  },
  created() {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://127.0.0.1:5000/protected', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        this.message = response.data.logged_in_as.username;
      })
      .catch((error) => {
        console.error('Error:', error);
        // Redirect to login page on error
        this.$router.push('/');
      });
    } else {
      console.error('No token found');
      this.$router.push('/');
    }
  },
  mounted() {
    this.fetchMovies();
  },
  methods: {
    async fetchMovies() {
      try {
        const response = await axios.get('http://127.0.0.1:5000/shows');
        this.movies = response.data;
        console.log('this is the movies data',response.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    },
    handleBannerClick(movie) {
      console.log('Clicked on movie:', movie.language);
      // Navigate to the movie details page or perform other actions
      this.$router.push({ path: '/showTimings', query: { 
    showName: movie.show_name,
    username: this.username
  } });

    },
    openProfile(){
      this.$router.push({path:'/userProfile',query:{
        username:this.username
      }})
    },
    logout() {
      // Remove the token from local storage
      localStorage.removeItem('token');
      // Redirect to the home page
      this.$router.push('/');
    },
  },
};
</script>

<style>

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px 20px;
  background-color: #f4f4f4;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.title {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1; /* Allows the title to expand and occupy the center */
  margin: 0;
  text-align: center;
  font-size: 1.5rem;
  margin-left:60px;
}

.logout-button {
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
  margin-right:20px;
}

.logout-button:hover {
  background-color: #ff1a1a;
}

.banners {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
  margin-top: 20px;
}

.banner {
  margin: 20px;
  cursor: pointer;
  text-align: center;
}

.banner img {
  width: 200px;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
}


</style>
