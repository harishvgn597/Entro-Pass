<template>
    <div>
        <div class="header">
      
      <h1 class="title">User Profile</h1>
      <button class="logout-button" @click="logout">Logout</button>
    </div>
      <div v-if="bookings.length > 0">
        <div 
          v-for="booking in bookings" 
          :key="booking.booking_id" 
          class="booking-bubble"
        >
          <div class="booking-details">
            <!-- <p><strong>Booking ID:</strong> {{ booking.booking_id }}</p> -->
            <p><strong>Theatre Name:</strong> {{ booking.theatre_name }}</p>
            <p><strong>Show Name:</strong> {{ booking.show_name }}</p>
            <p><strong>Date:</strong> {{ booking.date }}</p>
            <p><strong>Start Time:</strong> {{ booking.start_time }}</p>
            <p><strong>Screen Number:</strong> {{ booking.screen_number }}</p>
            <p><strong>Number of Seats:</strong> {{ booking.numberOfSeats }}</p>
          </div>
          <button 
          class="rating-button" 
          @click="rateMovie(booking.booking_id)"
        >
          Rate the Movie
        </button>
        </div>
      </div>
      <p v-else>No bookings found.</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'UserBookings',
    data() {
      return {
        bookings: [], // Holds the bookings data
      };
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
      this.fetchBookings(); // Fetch bookings when the component is created
    },
    methods: {
      fetchBookings() {
        const username = this.$route.query.username; // Get username from the query parameter
        console.log('Fetching bookings for username:', username);
  
        axios
          .get(`http://127.0.0.1:5000/bookings?username=${username}`) // Make API call
          .then((response) => {
            this.bookings = response.data; // Assign the response data to bookings
          })
          .catch((error) => {
            console.error('Error fetching bookings:', error); // Handle errors
          });
      },
      logout() {
      // Remove the token from local storage
      localStorage.removeItem('token');
      // Redirect to the home page
      this.$router.push('/');
    },
    rateMovie(bookingId) {
      // Navigate to the userRating route with booking_id as a query parameter
      this.$router.push({ path: '/userRating', query: { booking_id: bookingId,username: this.$route.query.username } });
    }
    },
  };
  </script>
  
  <style scoped>
  /* Container for booking bubbles */
  .booking-bubble {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  /* Styling for booking details */
  .booking-details p {
    margin: 5px 0;
  }
  
  /* Rating button styling */
  .rating-button {
    padding: 10px 15px;
    background-color: #007bff; /* Blue color */
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s ease;
  }
  
  .rating-button:hover {
    background-color: #0056b3; /* Darker blue on hover */
  }
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
  </style>
  